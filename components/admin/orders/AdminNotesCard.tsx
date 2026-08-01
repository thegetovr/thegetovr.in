"use client";

import { useEffect, useState, useTransition } from "react";

import { updateAdminNotesAction } from "@/app/admin/orders/actions";

type AdminNotesCardProps = {
  orderNumber: string;
  initialNotes: string;
};

export default function AdminNotesCard({
  orderNumber,
  initialNotes,
}: AdminNotesCardProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] =
    useState(initialNotes);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const hasChanges = notes !== savedNotes;

  function handleSave() {
    startTransition(async () => {
      try {
        await updateAdminNotesAction(
          orderNumber,
          notes,
        );

        setSavedNotes(notes);

        setMessage({
          type: "success",
          text: "Notes saved successfully.",
        });
      } catch {
        setMessage({
          type: "error",
          text: "Failed to save notes.",
        });
      }
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Admin Notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        disabled={isPending}
        rows={8}
        placeholder="Add internal notes for this order..."
        className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
      />

      <button
        type="button"
        disabled={!hasChanges || isPending}
        onClick={handleSave}
        className="mt-4 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending ? "Saving..." : "Save Notes"}
      </button>

      {message && (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-700 bg-green-500/10 text-green-400"
              : "border-red-700 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <p className="mt-4 text-xs text-zinc-500">
        These notes are visible only to administrators.
      </p>
    </section>
  );
}