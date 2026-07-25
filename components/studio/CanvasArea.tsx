interface Props {
  product: string;
}

export default function CanvasArea({ product }: Props) {
  return (
    <section className="flex h-[700px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="text-center">
        <div className="mb-6 text-7xl">👕</div>

        <h2 className="text-4xl font-bold uppercase">{product}</h2>

        <p className="mt-4 text-zinc-400">Product preview will appear here</p>
      </div>
    </section>
  );
}
