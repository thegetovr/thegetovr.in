type Props = {
  number: string;
  title: string;
  description: string;
};

export default function StepCard({
  number,
  title,
  description,
}: Props) {
  return (
    <div className="group relative border-t border-(--color-border) pt-8 transition-transform duration-500 hover:-translate-y-1">
      <div>
  <span className="font-(--font-editorial) text-5xl font-normal leading-none text-(--color-text-primary) sm:text-6xl">
    {number}
  </span>
</div>
      <h3 className="mt-12 font-(--font-editorial) text-3xl font-normal text-(--color-text-primary) sm:text-4xl">
        {title}
      </h3>

      <p className="mt-5 max-w-sm leading-7 text-(--color-text-secondary)">
        {description}
      </p>

      <div className="mt-10 h-1 w-8 bg-(--color-text-primary) transition-all duration-500 group-hover:w-16" />
    </div>
  );
}