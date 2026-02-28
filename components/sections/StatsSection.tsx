type StatsSectionProps = {
  years: string;
};

const stats = [
  { value: "45+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Client Satisfaction" },
];

export function StatsSection({ years }: StatsSectionProps) {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center py-4 px-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary-100/50 transition"
            >
              <p className="text-xl sm:text-2xl font-bold text-primary-500 tabular-nums">
                {i === 0 ? `${years}+` : s.value}
              </p>
              <p className="mt-0.5 text-gray-500 text-xs sm:text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
