interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export function Stats({ items }: { items: StatItem[] }) {
  const defaultStats = [
    { label: 'Students', value: '2,000+', icon: '👥' },
    { label: 'Teachers', value: '80+', icon: '👨‍🏫' },
    { label: 'Pass Rate', value: '98%', icon: '📈' },
    { label: 'Years of Excellence', value: '25', icon: '🏆' },
  ];

  const displayStats = items?.length > 0 ? items : defaultStats;

  return (
    <section className="bg-blue-900 py-16 my-12 shadow-inner">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center group transition-transform hover:scale-105">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-200 uppercase tracking-widest text-sm font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}