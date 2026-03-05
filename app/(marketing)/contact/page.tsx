import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ELEVATE | Request a Consultation",
  description: "Request a free consultation for remodeling or painting. ELEVATE — +1 312-483-6046. Deerfield, IL. We respond within 24 hours.",
};

const SOURCE_OPTIONS = ["Google", "Social Media", "Previous client", "Advertisement", "Other"];

const PHONE = "+1 312-483-6046";
const EMAIL = "Mike@getelevated.us";
const ADDRESS = "Deerfield, IL";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <p className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Contact</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Request a Consultation</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Commercial or residential—share your project details and we&apos;ll reply within 24 hours with a free, no-obligation consultation.
        </p>

        <div className="mt-14 grid lg:grid-cols-2 gap-14">
          <div className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 lg:p-10 shadow-soft">
            <ContactForm sourceOptions={SOURCE_OPTIONS} />
          </div>
          <div className="space-y-8">
            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft">
              <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Email</h3>
              <a href={`mailto:${EMAIL}`} className="mt-2 text-gray-900 font-medium hover:text-primary-500 transition block">
                {EMAIL}
              </a>
            </div>
            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft">
              <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Phone</h3>
              <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="mt-2 text-gray-900 font-medium hover:text-primary-500 transition block text-lg">
                {PHONE}
              </a>
            </div>
            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 shadow-soft">
              <h3 className="text-sm font-semibold text-primary-500 uppercase tracking-wider">Address</h3>
              <p className="mt-2 text-gray-600">{ADDRESS}</p>
            </div>
            <p className="text-sm text-gray-500">
              Licensed & insured · Serving South Florida · Free estimates
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
