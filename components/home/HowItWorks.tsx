import StepCard from "./StepCard";

import Reveal from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export default function HowItWorks() {
  return (
    <section className="bg-(--color-surface-muted) py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <Reveal y={25} duration={0.7}>
          <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--color-text-muted)">
              How It Works
            </p>

            <h2 className="mt-5 font-(--font-editorial) text-4xl font-normal leading-tight text-(--color-text-primary) sm:text-5xl lg:text-6xl">
              Create Your Apparel
              <br />
              In Three Simple Steps
            </h2>

            <p className="mt-6 text-lg leading-8 text-(--color-text-secondary)">
              From your idea to a premium finished product in just a few clicks.
            </p>
          </div>
        </Reveal>

        {/* Steps */}
        <Stagger
          className="grid gap-6 lg:grid-cols-3"
          stagger={0.15}
          delay={0.1}
        >
          <StaggerItem>
            <StepCard
              number="01"
              title="Upload"
              description="Upload your logo, artwork, illustration or design directly into the studio."
            />
          </StaggerItem>

          <StaggerItem>
            <StepCard
              number="02"
              title="Customize"
              description="Resize, rotate and position your design exactly where you want it."
            />
          </StaggerItem>

          <StaggerItem>
            <StepCard
              number="03"
              title="Print & Deliver"
              description="We print your apparel using premium materials and deliver it to your doorstep."
            />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
