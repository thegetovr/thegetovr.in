interface TimelineStepProps {
  title: string;
  completed: boolean;
  current: boolean;
  isLast: boolean;
}

const STEP_DESCRIPTIONS: Record<string, string> = {
  Placed: "We've received your order successfully.",
  Processing: "Your order is being prepared for production.",
  Printing: "Your apparel is currently being printed.",
  "Quality Check": "Every item is carefully inspected.",
  Packed: "Your order has been packed securely.",
  Shipped: "Your package is on its way.",
  Delivered: "Your order has arrived. Enjoy!",
};

export default function TimelineStep({
  title,
  completed,
  current,
  isLast,
}: TimelineStepProps) {
  const indicator = completed ? "✓" : current ? "●" : "";

  const indicatorClass = completed
    ? "bg-green-500 text-black"
    : current
      ? "bg-white text-black"
      : "border border-zinc-700 bg-zinc-900";

  return (
  <div>
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        current
          ? "border-zinc-700 bg-zinc-900"
          : completed
            ? "border-zinc-800 bg-zinc-950"
            : "border-transparent"
      }`}
    >
      <div className="flex items-start gap-4 p-5">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${indicatorClass}`}
        >
          {indicator}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <h3
              className={`${
                current
                  ? "text-lg font-semibold text-white"
                  : completed
                    ? "text-base font-medium text-zinc-200"
                    : "text-base font-medium text-zinc-500"
              }`}
            >
              {title}
            </h3>

            {current && (
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
                Current
              </span>
            )}

            {completed && !current && (
              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-green-400">
                Completed
              </span>
            )}
          </div>

          {(current || completed) && (
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {STEP_DESCRIPTIONS[title]}
            </p>
          )}
        </div>
      </div>
    </div>

    {!isLast && (
      <div className="ml-5 h-6 border-l border-zinc-800" />
    )}
  </div>
);
}
