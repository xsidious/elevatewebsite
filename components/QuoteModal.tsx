"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContactForm } from "@/components/sections/ContactForm";

const SOURCE_OPTIONS = ["Google", "Social Media", "Previous client", "Advertisement", "Other"];

type QuoteModalProps = {
  onClose: () => void;
  initialProjectType?: string;
};

export function QuoteModal({ onClose, initialProjectType }: QuoteModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-[80%] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden rounded-t-3xl animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 id="quote-modal-title" className="text-lg sm:text-xl font-bold text-gray-900">
            Get a free quote
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <p className="text-gray-600 text-sm mb-5">
            Tell us about your project and we&apos;ll get back within 24 hours. Free estimate, no obligation.
          </p>
          <ContactForm
            sourceOptions={SOURCE_OPTIONS}
            initialProjectType={initialProjectType}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
