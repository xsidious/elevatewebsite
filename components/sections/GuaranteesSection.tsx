const guarantees = [
  { title: "On-time & on budget", icon: "clock" },
  { title: "100% Satisfaction Guarantee", icon: "check" },
  { title: "Licensed & Insured", icon: "shield" },
  { title: "Experienced & Qualified", icon: "badge" },
];

function Icon({ name }: { name: string }) {
  const cls = "w-5 h-5 text-primary-500";
  if (name === "clock")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (name === "check")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function GuaranteesSection() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-primary-500 font-semibold text-xs uppercase tracking-[0.2em] text-center">Why Choose Us</p>
        <h2 className="mt-1.5 text-xl font-bold text-gray-900 sm:text-2xl text-center">
          Why Clients Choose Us
        </h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100/50 transition"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                <Icon name={g.icon} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{g.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
