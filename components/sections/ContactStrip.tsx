import Link from "next/link";

type ContactStripProps = {
  headline?: string;
  subline?: string;
};

export function ContactStrip({
  headline = "Contact us",
  subline = "Tell us about your project",
}: ContactStripProps) {
  return (
    <section className="py-20 lg:py-28 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-primary-400 font-semibold text-sm uppercase tracking-[0.2em]">{headline}</p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{subline}</h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Have a specific project in mind? Contact our team to discuss your needs and explore available options.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-400 transition shadow-soft"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
