import TimelineStep from "./TimelineStep";

const ORDER_STEPS = [
  "Placed",
  "Processing",
  "Printing",
  "Quality Check",
  "Packed",
  "Shipped",
  "Delivered",
] as const;

interface OrderTimelineProps {
  status: string;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const activeIndex = Math.max(
    0,
    ORDER_STEPS.findIndex(
      (step) => step.toLowerCase() === status.toLowerCase(),
    ),
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order Journey</h2>

        <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
          {activeIndex + 1} / {ORDER_STEPS.length}
        </span>
      </div>

      <div className="relative mt-10 px-3">
        <div className="absolute left-9 right-9 top-6 h-0.5 bg-zinc-800">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{
              width: `${(activeIndex / (ORDER_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
        <div className="grid w-full grid-cols-7">
          {ORDER_STEPS.map((step, index) => (
            <TimelineStep
              key={step}
              title={step}
              completed={index < activeIndex}
              current={index === activeIndex}
              isLast={index === ORDER_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
