import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    <section className="bg-black py-36">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
            HOW IT WORKS
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Create Your Apparel
            <br />
            In Three Simple Steps
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            From your idea to a premium finished product in just a few clicks.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <StepCard
            number="01"
            title="Upload"
            description="Upload your logo, artwork, illustration or design directly into the studio."
          />

          <StepCard
            number="02"
            title="Customize"
            description="Resize, rotate and position your design exactly where you want it."
          />

          <StepCard
            number="03"
            title="Print & Deliver"
            description="We print your apparel using premium materials and deliver it to your doorstep."
          />

        </div>

      </div>

    </section>
  );
}