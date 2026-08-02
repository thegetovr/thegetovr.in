interface TimelineStepProps {
  title: string;
  completed: boolean;
  current: boolean;
  isLast: boolean;
}

export default function TimelineStep({
  title,
  completed,
  current,
}: TimelineStepProps) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex flex-1 flex-col items-center">
        <div
          className={`relative z-10 flex items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 ${
            completed || current ? "h-12 w-12" : "h-10 w-10"
          }
            ${
              completed
                ? "border-green-500 bg-green-500 text-black"
                : current
                  ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                  : "border-zinc-700 bg-zinc-900 text-zinc-500"
            }`}
        >
          {completed ? "✓" : current ? "●" : ""}
        </div>

        <p
          className={`mt-4 max-w-18 text-center text-[11px] font-medium leading-4 md:max-w-none md:text-sm
            ${completed || current ? "text-white" : "text-zinc-500"}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
