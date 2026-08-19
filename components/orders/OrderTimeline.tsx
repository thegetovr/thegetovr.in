import TimelineStep from "./TimelineStep";

const ORDER_STEPS = [
  {
    key: "pending",
    label: "Placed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "printing",
    label: "Printing",
  },
  {
    key: "quality-check",
    label: "Quality Check",
  },
  {
    key: "packaging",
    label: "Packed",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
] as const;

interface OrderTimelineProps {
  status: string;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const activeIndex = Math.max(
    0,
    ORDER_STEPS.findIndex((step) => step.key === status.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black">Order Status</h2>

        <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          {activeIndex + 1} / {ORDER_STEPS.length}
        </span>
      </div>

      <div className="relative mt-10 px-3">
        {/* Progress Line */}
        <div className="absolute left-9 right-9 top-6 h-0.5 bg-gray-200">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{
              width: `${(activeIndex / (ORDER_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Timeline Steps */}
        <div className="grid w-full grid-cols-7">
          {ORDER_STEPS.map((step, index) => (
            <TimelineStep
              key={step.key}
              title={step.label}
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
