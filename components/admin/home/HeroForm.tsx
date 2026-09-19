import FileField from "@/components/admin/forms/FileField";
import SubmitButton from "@/components/admin/common/SubmitButton";
import TextField from "@/components/admin/forms/TextField";
import type { HomeHero } from "@/types/home";
import { saveHomeHero } from "@/lib/homeActions";

interface HeroFormProps {
  hero: HomeHero | null;
}

export default function HeroForm({ hero }: HeroFormProps) {
  return (
    <form
      action={saveHomeHero}
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
    >
      <div className="space-y-10">
        <section>
          <div>
            <h2 className="text-xl font-semibold text-white">Hero Content</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Control the main message and calls to action shown at the top of
              the homepage.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <TextField
              id="eyebrow"
              name="eyebrow"
              label="Eyebrow"
              defaultValue={hero?.eyebrow ?? "Light Canvas. Dark Attitude."}
            />

            <div>
              <label
                htmlFor="heading"
                className="block text-sm font-medium text-zinc-300"
              >
                Heading
              </label>

              <textarea
                id="heading"
                name="heading"
                rows={3}
                defaultValue={hero?.heading ?? "Wear What Hits Different."}
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-zinc-300"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={
                  hero?.description ??
                  "Premium streetwear. Custom designs. Made for the ones who create their own vibe."
                }
                className="mt-2 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-white"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            Primary Call To Action
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextField
              id="primaryCtaLabel"
              name="primaryCtaLabel"
              label="Button Label"
              defaultValue={hero?.primaryCtaLabel ?? "Shop Now"}
            />

            <TextField
              id="primaryCtaLink"
              name="primaryCtaLink"
              label="Button Link"
              defaultValue={hero?.primaryCtaLink ?? "/shop"}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">
            Secondary Call To Action
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextField
              id="secondaryCtaLabel"
              name="secondaryCtaLabel"
              label="Button Label"
              defaultValue={hero?.secondaryCtaLabel ?? "Explore Studio"}
            />

            <TextField
              id="secondaryCtaLink"
              name="secondaryCtaLink"
              label="Button Link"
              defaultValue={hero?.secondaryCtaLink ?? "/studio"}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Hero Image</h2>

          <div className="mt-6">
            <FileField
              id="heroImage"
              name="heroImage"
              label="Upload Hero Image"
            />

            <TextField
              id="heroImageAlt"
              name="heroImageAlt"
              label="Image Alt Text"
              defaultValue={hero?.image?.alt ?? ""}
              placeholder="Describe the hero image"
            />

            {hero?.image?.url && (
              <p className="mt-2 text-xs text-zinc-500">
                A hero image is currently configured. Uploading a new image will
                replace it.
              </p>
            )}
          </div>
        </section>

        <section>
          <div>
            <h2 className="text-xl font-semibold text-white">Trust Points</h2>

            <p className="mt-1 text-sm text-zinc-500">
              The four supporting points displayed below the hero actions.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {(
              hero?.trustPoints ?? [
                {
                  icon: "check",
                  title: "Premium Quality",
                  subtitle: "Built to last",
                },
                {
                  icon: "sparkles",
                  title: "Custom Designs",
                  subtitle: "Make it yours",
                },
                {
                  icon: "truck",
                  title: "Fast & Reliable",
                  subtitle: "Pan India",
                },
                {
                  icon: "star",
                  title: "Loved by Thousands",
                  subtitle: "4.5+ ratings",
                },
              ]
            ).map((point, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-5"
              >
                <p className="mb-4 text-sm font-semibold text-zinc-300">
                  Trust Point {index + 1}
                </p>

                <div className="grid gap-6 md:grid-cols-3">
                  <TextField
                    id={`trustPoint-${index}-icon`}
                    name={`trustPoint-${index}-icon`}
                    label="Icon"
                    defaultValue={point.icon}
                  />

                  <TextField
                    id={`trustPoint-${index}-title`}
                    name={`trustPoint-${index}-title`}
                    label="Title"
                    defaultValue={point.title}
                  />

                  <TextField
                    id={`trustPoint-${index}-subtitle`}
                    name={`trustPoint-${index}-subtitle`}
                    label="Subtitle"
                    defaultValue={point.subtitle}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <SubmitButton label="Save Hero" pendingLabel="Saving..." />
        </div>
      </div>
    </form>
  );
}
