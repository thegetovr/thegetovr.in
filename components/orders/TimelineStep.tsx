interface TimelineStepProps {
  title: string;
  completed: boolean;
  current: boolean;
  isLast: boolean;
  date?: string;
  isExpectedDelivery?: boolean;
}

export default function TimelineStep({
  title,
  completed,
  current,
  date,
  isExpectedDelivery = false,
}: TimelineStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col items-center">
        <div
          className={`relative z-10 flex items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 ${
            completed || current ? "h-12 w-12" : "h-10 w-10"
          } ${
            completed
              ? "border-green-500 bg-green-500 text-black"
              : current
                ? "border-green-500 bg-green-500 text-black"
                : "border-gray-200 bg-white text-gray-400"
          }`}
        >
          {completed || current ? "✓" : ""}
        </div>

        <p
          className={`mt-4 max-w-20 text-center text-[11px] font-medium leading-4 md:max-w-none md:text-sm ${
            completed || current ? "text-black" : "text-gray-500"
          }`}
        >
          {title}
        </p>

        {date && (
          <div className="mt-2 text-center">
            {isExpectedDelivery && (
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                Expected Delivery
              </p>
            )}

            <p className="text-[11px] leading-4 text-gray-500 md:text-xs">
              {date}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
