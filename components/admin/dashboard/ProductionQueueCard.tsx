import { ReactNode } from "react";

type ProductionQueueCardProps = {
  children: ReactNode;
  isEmpty: boolean;
};

export default function ProductionQueueCard({
  children,
  isEmpty,
}: ProductionQueueCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">
          Production Queue
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          Orders currently in production.
        </p>
      </div>

      {isEmpty ? (
        <div className="px-6 py-10 text-center">
          <div className="text-3xl">✅</div>

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
    </div>
  );
}