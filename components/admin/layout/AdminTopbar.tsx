export default function AdminTopbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">
      <div>
        <h1 className="text-lg font-semibold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-zinc-500">
          The Getovr Admin
        </p>
      </div>

      <div className="text-sm text-zinc-400">
        Welcome 👋
      </div>
    </header>
  );
}