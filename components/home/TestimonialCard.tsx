export default function TestimonialCard() {
  return (
    <div className="rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface) p-8 shadow-(--shadow-soft)">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full border border-(--color-border) bg-(--color-surface-muted)" />

        <div>
          <h3 className="font-semibold text-(--color-text-primary)">
            John Doe
          </h3>

          <p className="text-sm text-(--color-text-muted)">
            Verified Customer
          </p>
        </div>
      </div>

      <div
        className="mt-6 tracking-wide text-(--color-accent)"
        aria-label="5 out of 5 stars"
      >
        ★★★★★
      </div>

      <p className="mt-4 leading-7 text-(--color-text-secondary)">
        The quality exceeded my expectations. The print was sharp, the fabric
        felt premium, and the delivery was fast.
      </p>
    </div>
  );
}