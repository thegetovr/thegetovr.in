type Props = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: Props) {
  return (
    <div
      className={`mb-12 lg:mb-16 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--color-text-muted)">
        {eyebrow}
      </p>

      <h2 className="mt-5 font-(--font-editorial) text-4xl font-normal leading-tight tracking-tight text-(--color-text-primary) sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      <p className="mt-6 text-base leading-7 text-(--color-text-secondary) sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  );
}