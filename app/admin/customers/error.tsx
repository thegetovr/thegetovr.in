"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function CustomersError({
  error,
  reset,
}: ErrorPageProps) {
  console.error(error);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
      <div className="w-full rounded-2xl border border-red-900/40 bg-zinc-900/50 p-10 text-center">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mt-3 text-zinc-400">
          We couldn&apos;t load the customers page.
        </p>

        <button
          onClick={reset}
          className="mt-8 rounded-lg bg-white px-5 py-2 text-black transition hover:bg-zinc-200"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}