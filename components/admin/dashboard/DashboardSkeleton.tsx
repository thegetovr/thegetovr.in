import StatsCardSkeleton from "./StatsCardSkeleton";
import CardSkeleton from "./CardSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-10 w-72 rounded bg-zinc-800" />
        <div className="mt-3 h-5 w-96 rounded bg-zinc-800" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CardSkeleton rows={6} />
        </div>

        <div className="space-y-6">
          <CardSkeleton rows={4} />
          <CardSkeleton rows={4} />
          <CardSkeleton rows={4} />
        </div>
      </div>
    </div>
  );
}