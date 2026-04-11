import { statsData } from "./mockData";
import StatsCard from "./StatsCard";

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-12 gap-6 mb-12">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          iconColor={stat.iconColor}
          bgColor={stat.bgColor}
          borderLeft={stat.borderLeft}
        />
      ))}
    </section>
  );
}
