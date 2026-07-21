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
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.45em] text-gray-500">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-5xl font-black leading-tight">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-400">
        {description}
      </p>
    </div>
  );
}