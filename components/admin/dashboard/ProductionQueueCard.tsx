import { ReactNode } from "react";
import { SuccessIcon } from "@/components/admin/icons";
type ProductionQueueCardProps = {
  children: ReactNode;
  isEmpty: boolean;
};

export default function ProductionQueueCard({
  children,
  isEmpty,
}: ProductionQueueCardProps) {
  return (
    <section
      aria-labelledby="production-queue-heading"
      className="rounded-2xl border border-zinc-800 bg-zinc-900"
    >
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2
          id="production-queue-heading"
          className="text-lg font-semibold text-white"
        >
          Production Queue
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Orders currently in production.
        </p>
      </div>

      {isEmpty ? (
        <div className="px-6 py-10 text-center">
          <div className="flex justify-center">
            <SuccessIcon
              className="h-10 w-10 text-emerald-500"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 font-medium text-white">
            Production queue is clear
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            There are no orders currently in production.
          </p>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </section>
  );
}
