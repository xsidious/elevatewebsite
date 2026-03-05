"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    children: [
      { href: "/services/interior-painting", label: "Interior Painting" },
      { href: "/services/exterior-painting", label: "Exterior Painting" },
      { href: "/services/kitchen-remodeling", label: "Kitchen Remodeling" },
      { href: "/services/bathroom-renovation", label: "Bathroom Renovation" },
      { href: "/services/basement-remodeling", label: "Basement Remodeling" },
      { href: "/services/custom-deck-building", label: "Custom Deck Building" },
      { href: "/services/general-contracting", label: "General Contracting" },
      { href: "/services/interior-design-home-upgrades", label: "Interior Design & Home Upgrades" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/quote", label: "Quote Calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const openQuoteModal = () => {
    const base = pathname || "/";
    router.push(base + (base.includes("?") ? "&" : "?") + "quote=1");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/elevatelogo.png" alt="ELEVATE" className="h-12 w-auto object-contain invert" width={240} height={48} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="text-gray-300 hover:text-primary-400 font-medium py-2 transition-colors"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56">
                      <div className="bg-white rounded-2xl py-3 shadow-soft-lg border border-gray-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-gray-300 hover:text-primary-400 hover:bg-gray-800 transition rounded-lg mx-2"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`font-medium py-2 transition-colors ${
                    pathname === item.href ? "text-primary-400" : "text-gray-300 hover:text-primary-400"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+13124836046"
              className="flex items-center gap-2 text-gray-300 hover:text-primary-400 transition text-sm font-medium"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-primary-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
                </svg>
              </span>
              +1 312-483-6046
            </a>
            <button
              type="button"
              onClick={openQuoteModal}
              className="inline-flex items-center px-5 py-2.5 bg-primary-500 text-gray-900 font-semibold rounded-full hover:bg-primary-600 transition shadow-soft"
            >
              Get a Quote
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-gray-300 hover:text-primary-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pt-3 pb-4 border-t border-gray-800 bg-gray-900 backdrop-blur-sm">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label} className="py-2">
                    <span className="block px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-gray-300 hover:text-primary-400"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-xl ${pathname === item.href ? "bg-gray-800 text-primary-400 font-medium" : "text-gray-300 hover:bg-gray-800"}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href="tel:+13124836046"
                className="mx-4 mt-4 flex items-center justify-center gap-2 py-3 rounded-full bg-primary-500 text-gray-900 font-semibold"
              >
                +1 312-483-6046
              </a>
              <button
                type="button"
                onClick={openQuoteModal}
                className="mx-4 mt-2 py-3 w-[calc(100%-2rem)] text-center rounded-full border-2 border-primary-500 text-primary-400 font-semibold"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
