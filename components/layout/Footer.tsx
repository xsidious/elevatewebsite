import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/projects", label: "Our Gallery" },
  { href: "/quote", label: "Quote Calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
  { href: "/services/home-renovation", label: "Home Renovation" },
  { href: "/services/kitchen-redesign-remodel", label: "Kitchen Remodel" },
  { href: "/services/bathroom-redesign-remodel", label: "Bathroom Remodel" },
  { href: "/services/restoration-and-repairs", label: "Restoration & Repairs" },
  { href: "/services/flooring-and-tile", label: "Flooring & Tile" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link href="/" className="inline-block">
              <img src="/elevatelogo.png" alt="ELEVATE" className="h-12 w-auto object-contain" width={240} height={48} />
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-xs">
              Elevating your vision with quality work and clear communication. We deliver results that last.
            </p>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="mailto:hello@elevate.com" className="hover:text-primary-500 transition">hello@elevate.com</a></li>
              <li><a href="tel:5612473693" className="hover:text-primary-500 transition">(561) 247-3693</a></li>
              <li>6778 Lantana Rd, Suite 8, Greenacres, FL 33467</li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition text-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ELEVATE. All rights reserved.</p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link href="/contact" className="hover:text-primary-500 transition">Privacy</Link>
            <Link href="/contact" className="hover:text-primary-500 transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
