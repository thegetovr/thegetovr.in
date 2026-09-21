"use client";

import { useEffect, useState } from "react";

interface Announcement {
  _id: string;
  text: string;
  active: boolean;
  order: number;
}

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [text, setText] = useState("");
  const [order, setOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadAnnouncements() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/announcements", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      console.log("📢 LOAD ANNOUNCEMENTS:", {
        status: response.status,
        data,
      });

      if (!response.ok) {
        console.error("❌ LOAD ERROR:", data);
        return;
      }

      if (data.success) {
        setAnnouncements(data.announcements ?? []);
      }
    } catch (error) {
      console.error("❌ Failed to load announcements:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  function resetForm() {
    setText("");
    setOrder("0");
    setActive(true);
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      alert("Please enter announcement text.");
      return;
    }

    if (trimmedText.length > 200) {
      alert("Announcement cannot exceed 200 characters.");
      return;
    }

    const numericOrder = Number(order);

    if (!Number.isFinite(numericOrder) || numericOrder < 0) {
      alert("Please enter a valid display order.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `/api/admin/announcements/${editingId}`
        : "/api/admin/announcements";

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        text: trimmedText,
        active,
        order: numericOrder,
      };

      console.log("📤 ANNOUNCEMENT REQUEST:", {
        url,
        method,
        payload,
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("📥 ANNOUNCEMENT RESPONSE:", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        alert(data?.message || `Request failed with status ${response.status}`);
        return;
      }

      if (!data.success) {
        alert(data?.message || "Something went wrong.");
        return;
      }

      alert(
        isEditing
          ? "Announcement updated successfully."
          : "Announcement added successfully.",
      );

      resetForm();

      await loadAnnouncements();
    } catch (error) {
      console.error("❌ SAVE ANNOUNCEMENT ERROR:", error);
      alert("Failed to save announcement. Check browser console.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(announcement: Announcement) {
    console.log("✏️ EDIT ANNOUNCEMENT:", announcement);

    setEditingId(announcement._id);
    setText(announcement.text);
    setOrder(String(announcement.order));
    setActive(announcement.active);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?",
    );

    if (!confirmed) {
      return;
    }

    try {
      console.log("🗑️ DELETE ANNOUNCEMENT:", id);

      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      console.log("📥 DELETE RESPONSE:", {
        status: response.status,
        ok: response.ok,
        data,
      });

      if (!response.ok) {
        alert(data?.message || `Delete failed with status ${response.status}`);
        return;
      }

      if (!data.success) {
        alert(data?.message || "Failed to delete announcement.");
        return;
      }

      alert("Announcement deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      await loadAnnouncements();
    } catch (error) {
      console.error("❌ DELETE ANNOUNCEMENT ERROR:", error);
      alert("Failed to delete announcement.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Add / Edit Form */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {editingId ? "Edit Announcement" : "Add Announcement"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            This message will appear in the announcement bar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Announcement Text
            </label>

            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={200}
              placeholder="FREE DELIVERY ON ORDERS ABOVE ₹999"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-white"
            />

            <p className="mt-2 text-xs text-zinc-500">
              {text.length}/200 characters
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Display Order
              </label>

              <input
                type="number"
                min="0"
                value={order}
                onChange={(event) => setOrder(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Status
              </label>

              <button
                type="button"
                onClick={() => setActive((value) => !value)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-emerald-700 bg-emerald-950 text-emerald-300"
                    : "border-zinc-700 bg-zinc-900 text-zinc-400"
                }`}
              >
                {active ? "Active" : "Inactive"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Announcement"
                  : "Add Announcement"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Announcement List */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 px-6 py-5">
          <h2 className="text-xl font-semibold text-white">
            All Announcements
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-zinc-500">
            Loading announcements...
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-zinc-400">No announcements added yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-base font-medium text-white">
                    {announcement.text}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                    <span
                      className={
                        announcement.active
                          ? "rounded-full bg-emerald-950 px-3 py-1 text-emerald-300"
                          : "rounded-full bg-zinc-900 px-3 py-1 text-zinc-500"
                      }
                    >
                      {announcement.active ? "Active" : "Inactive"}
                    </span>

                    <span className="text-zinc-500">
                      Order: {announcement.order}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(announcement)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(announcement._id)}
                    className="rounded-lg border border-red-900/50 px-4 py-2 text-sm text-red-400 transition hover:bg-red-950/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
