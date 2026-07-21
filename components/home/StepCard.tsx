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
    <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20">

      {/* Glow */}
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/[0.03] blur-[90px]" />

      {/* Step Number */}
      <div className="relative mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl font-bold text-white">
        {number}
      </div>

      <h3 className="relative text-3xl font-bold">
        {title}
      </h3>

      <p className="relative mt-5 leading-7 text-gray-400">
        {description}
      </p>

    </div>
  );
}