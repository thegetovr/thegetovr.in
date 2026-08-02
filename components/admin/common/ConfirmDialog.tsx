"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";

import SubmitButton from "./SubmitButton";

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  pendingLabel?: string;
  cancelLabel?: string;
  action: (formData: FormData) => void | Promise<void>;
}

export default function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  pendingLabel = "Processing...",
  cancelLabel = "Cancel",
  action,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <AlertDialog.Title className="text-lg font-semibold text-white">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-2 text-sm text-zinc-400">
            {description}
          </AlertDialog.Description>

          <form action={action}>
            <div className="mt-6 flex justify-end gap-3">
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
                >
                  {cancelLabel}
                </button>
              </AlertDialog.Cancel>

              <SubmitButton
                label={confirmLabel}
                pendingLabel={pendingLabel}
                variant="danger"
              />
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}