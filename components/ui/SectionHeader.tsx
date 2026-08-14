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
      className={`mb-16 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
        {eyebrow}
      </p>

      <h2 className="mt-5 font-(--font-editorial) text-5xl font-normal leading-tight text-(--color-text-primary)">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-8 text-(--color-text-secondary)">
        {description}
      </p>
    </div>
  );
}