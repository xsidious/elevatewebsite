import Link from "next/link";

const steps = [
  { num: "01", title: "Consultation", description: "We meet with you to understand your vision, budget, and timeline—no pressure, just clarity." },
  { num: "02", title: "Design", description: "We create drawings and plans so you can see the result before we start." },
  { num: "03", title: "Installation", description: "Our crew follows a clear scope and schedule so the job stays on track." },
  { num: "04", title: "Completion", description: "We do a final walkthrough with you to make sure everything meets your expectations." },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">How We Work</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          How We Work With You
        </h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative pl-6 border-l-2 border-primary-100 hover:border-primary-300 transition"
            >
              <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-500" />
              <span className="text-3xl font-bold text-primary-100">{step.num}</span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition"
          >
            Request a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
