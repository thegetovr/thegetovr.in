import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import SectionDivider from "@/components/ui/SectionDivider";

const values = [
  {
    number: "01",
    title: "INDIVIDUALITY",
    description:
      "There is no single way to be you. Your clothes should reflect that.",
  },
  {
    number: "02",
    title: "CREATIVITY",
    description:
      "Design is about experimenting, exploring, and turning an idea into something real.",
  },
  {
    number: "03",
    title: "QUALITY",
    description:
      "Good design means little if it doesn't feel good to wear. We care about the details, from the design to the finished piece.",
  },
  {
    number: "04",
    title: "SIMPLICITY",
    description:
      "Shopping should feel effortless. Finding something you love — or creating it yourself — shouldn't be complicated.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-(--color-page) text-(--color-text-primary)">
      {/* Hero */}
      <section>
        <Container>
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
                The Getovr
              </p>

              <h1 className="mt-8 font-(--font-editorial) text-5xl font-normal leading-[0.95] tracking-tight text-(--color-text-primary) md:text-8xl">
                WEAR WHAT
                <br />
                FEELS LIKE YOU.
              </h1>

              <p className="mt-10 max-w-xl text-lg leading-8 text-(--color-text-secondary) md:text-xl">
                The Getovr is a contemporary apparel brand built around
                individuality, expression, and the freedom to make something
                your own.
              </p>

              <Link
                href="/shop"
                className="mt-10 inline-flex border border-(--color-text-primary) px-7 py-3 text-sm font-semibold uppercase tracking-wider text-(--color-text-primary) transition-colors hover:bg-(--color-text-primary) hover:text-(--color-white)"
              >
                Explore Collection
              </Link>
            </div>

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-surface-muted)">
              <Image
                src="/images/about/hero.png"
                alt="The Getovr editorial campaign"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

            {/* Our Story */}
      <section>
        <Container>
          <div className="grid gap-12 py-24 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20 md:py-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-surface-muted)">
              <Image
                src="/images/about/story.png"
                alt="The Getovr apparel detail"
                sizes="(min-width: 768px) 42vw, 100vw"
                className="h-full w-full object-cover"
                width={1200}
                height={1500}
              />
            </div>

            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
                Our Story
              </p>

              <h2 className="mt-8 font-(--font-editorial) text-5xl font-normal leading-tight tracking-tight text-(--color-text-primary) md:text-6xl">
                Not just something you wear. Something you choose.
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-8 text-(--color-text-secondary)">
                <p>We believe clothing should feel personal.</p>

                <p>
                  The Getovr was created for people who don&apos;t want to
                  simply follow what is already out there. We bring together
                  thoughtfully designed ready-to-wear pieces with the freedom
                  to create something uniquely yours.
                </p>

                <p>
                  From everyday essentials to custom creations, our goal is
                  simple —{" "}
                  <strong className="font-semibold text-(--color-text-primary)">
                    give you more ways to express yourself.
                  </strong>
                </p>
              </div>

              <Link
                href="/shop"
                className="mt-10 inline-flex border border-(--color-text-primary) px-7 py-3 text-sm font-semibold uppercase tracking-wider text-(--color-text-primary) transition-colors hover:bg-(--color-text-primary) hover:text-(--color-white)"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

          {/* What We Stand For */}
      <section>
        <Container>
          <div className="border-t border-(--color-border) py-24 md:py-32">
            <div className="grid gap-16 md:grid-cols-[0.7fr_1.3fr] md:gap-24">
              <div>
                <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
                  What We Stand For
                </p>

                <h2 className="mt-8 max-w-md font-(--font-editorial) text-4xl font-normal leading-tight tracking-tight text-(--color-text-primary) md:text-5xl">
                  More than a look.
                  <br />
                  A point of view.
                </h2>
              </div>

              <div className="grid md:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value.number}
                    className="border-t border-(--color-border) px-0 py-8 md:px-8 md:py-10 first:pt-0 md:first:pt-10"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <span className="font-(--font-editorial) text-5xl font-normal leading-none text-(--color-text-primary)/20 md:text-6xl">
                        {value.number}
                      </span>
                    </div>

                    <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-(--color-text-primary)">
                      {value.title}
                    </h3>

                    <p className="mt-5 max-w-sm text-base leading-7 text-(--color-text-secondary)">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

            {/* Made For You */}
      <section>
        <Container>
          <div className="grid gap-12 border-t border-(--color-border) py-24 md:grid-cols-[1fr_1fr] md:items-center md:gap-20 md:py-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-surface-muted)">
              <Image
                src="/images/about/made-for-you.png"
                alt="The Getovr custom apparel"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-full w-full object-cover"
                width={1200}
                height={1500}
              />
            </div>

            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
                Made For You
              </p>

              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-(--color-text-muted)">
                Your Style. Your Idea. Your Getovr.
              </p>

              <h2 className="mt-6 font-(--font-editorial) text-5xl font-normal leading-tight tracking-tight text-(--color-text-primary) md:text-6xl">
                Made to feel like yours.
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-8 text-(--color-text-secondary)">
                <p>
                  Our collection is designed for everyday life, but with
                  enough character to stand apart.
                </p>

                <p>
                  And when something doesn&apos;t exist exactly the way you
                  imagined it?
                </p>
              </div>

              <p className="mt-8 font-(--font-editorial) text-4xl italic text-(--color-text-primary) md:text-5xl">
                Create it.
              </p>

              <p className="mt-6 text-lg leading-8 text-(--color-text-secondary)">
                With The Getovr Studio, you can bring your own ideas to life
                and make apparel that feels genuinely yours.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider />

            {/* The Getovr Studio */}
      <section className="bg-(--color-text-primary) text-(--color-white)">
        <Container>
          <div className="grid gap-12 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:py-24">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-surface-muted)">
              <Image
                src="/images/about/studio.png"
                alt="The Getovr Studio creative workspace"
                sizes="(min-width: 768px) 45vw, 100vw"
                className="h-full w-full object-cover"
                width={1200}
                height={1500}
              />
            </div>

            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.45em] text-(--color-white)/60">
                The Getovr Studio
              </p>

              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-(--color-white)/50">
                Imagine It. Design It. Wear It.
              </p>

              <h2 className="mt-6 font-(--font-editorial) text-5xl font-normal leading-tight tracking-tight md:text-6xl">
                Your creativity shouldn&apos;t stop at choosing from a rack.
              </h2>

              <div className="mt-8 max-w-2xl space-y-6 text-lg leading-8 text-(--color-white)/70">
                <p>
                  The Getovr Studio gives you the freedom to create custom
                  apparel from your own ideas — whether it&apos;s a graphic, a
                  statement, a memory, or simply something you&apos;ve always
                  wanted to wear.
                </p>

                <p>
                  <strong className="font-semibold text-(--color-white)">
                    Your idea starts with you.
                  </strong>{" "}
                  We help turn it into something you can wear.
                </p>
              </div>

              <Link
                href="/studio"
                className="mt-10 inline-flex border border-(--color-white) px-7 py-3 text-sm font-semibold uppercase tracking-wider text-(--color-white) transition-colors hover:bg-(--color-white) hover:text-(--color-text-primary)"
              >
                Create Your Own
              </Link>
            </div>
          </div>
        </Container>
      </section>

            <SectionDivider />

      {/* Philosophy */}
      <section>
        <Container>
          <div className="py-24 md:py-32">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-(--color-border)" />

                <p className="text-sm uppercase tracking-[0.45em] text-(--color-text-secondary)">
                  Our Philosophy
                </p>

                <span className="h-px w-10 bg-(--color-border)" />
              </div>

              <blockquote className="mt-12 text-center">
                <p className="font-(--font-editorial) text-5xl font-normal leading-[1.05] tracking-tight text-(--color-text-primary) md:text-7xl lg:text-8xl">
                  You don&apos;t have to dress like everyone else.
                </p>
              </blockquote>

              <div className="mx-auto mt-12 max-w-2xl text-center text-lg leading-8 text-(--color-text-secondary)">
                <p>
                  Trends come and go. Personal style stays.
                </p>

                <p className="mt-6">
                  We&apos;re building The Getovr around that idea — a place
                  where fashion can be expressive, accessible, and personal.
                </p>

                <p className="mt-6">
                  Because the best thing you can wear is something that feels
                  unmistakably{" "}
                  <strong className="font-semibold text-(--color-text-primary)">
                    you.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

            {/* Closing CTA */}
      <section className="bg-(--color-text-primary) text-(--color-white)">
        <Container>
          <div className="relative py-28 md:py-36">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm uppercase tracking-[0.5em] text-(--color-white)/50">
                The Getovr
              </p>

              <h2 className="mt-8 font-(--font-editorial) text-6xl font-normal leading-[0.95] tracking-tight md:text-8xl">
                Ready to find
                <br />
                yours?
              </h2>

              <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-(--color-white)/65">
                Explore the collection or create something from scratch.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex min-w-44 items-center justify-center border border-(--color-white) bg-(--color-white) px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-(--color-text-primary) transition-colors hover:bg-transparent hover:text-(--color-white)"
                >
                  Shop Collection
                </Link>

                <Link
                  href="/studio"
                  className="inline-flex min-w-44 items-center justify-center border border-(--color-white)/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-(--color-white)/80 transition-colors hover:border-(--color-white) hover:text-(--color-white)"
                >
                  Create Your Own
                </Link>
              </div>

              <div className="mx-auto mt-20 h-px max-w-5xl bg-(--color-white)/15" />

              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-(--color-white)/35">
                Wear what feels like you.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}