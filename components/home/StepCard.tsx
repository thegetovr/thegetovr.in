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
    <div className="group relative overflow-hidden rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-(--shadow-elevated)">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-(--color-accent)/10 blur-[90px]" />

      <div className="relative mb-10 flex h-16 w-16 items-center justify-center rounded-(--radius-md) border border-(--color-border) bg-(--color-surface-muted) text-2xl font-semibold text-(--color-text-primary)">
        {number}
      </div>

      <h3 className="relative font-(--font-editorial) text-3xl font-normal text-(--color-text-primary)">
        {title}
      </h3>

      <p className="relative mt-5 leading-7 text-(--color-text-secondary)">
        {description}
      </p>
    </div>
  );
}