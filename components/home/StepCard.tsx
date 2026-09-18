type Props = {
  number: string;
  title: string;
  description: string;
};

export default function StepCard({ number, title, description }: Props) {
  return (
    <div className="group relative border-t border-(--color-border) pt-8 transition-all duration-500 ease-out hover:-translate-y-1">
      {/* Number */}
      <div className="overflow-hidden">
        <span className="inline-block font-(--font-editorial) text-5xl font-normal leading-none text-(--color-text-primary) transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-6xl">
          {number}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-12 font-(--font-editorial) text-3xl font-normal text-(--color-text-primary) transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-4xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-5 max-w-sm leading-7 text-(--color-text-secondary)">
        {description}
      </p>

      {/* Accent Line */}
      <div className="mt-10 h-1 w-8 bg-(--color-text-primary) transition-all duration-500 ease-out group-hover:w-16" />
    </div>
  );
}
