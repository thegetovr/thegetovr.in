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
      <h2 className="mb-6 text-xl font-semibold">Tracking History</h2>

      <div className="space-y-4">
        {ORDER_STEPS.map((step, index) => {
          const completed = index <= activeIndex;

          return (
            <TimelineStep
              key={step}
              title={step}
              completed={index < activeIndex}
              current={index === activeIndex}
              isLast={index === ORDER_STEPS.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}
