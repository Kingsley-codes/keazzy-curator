import { IconType } from "react-icons";
import { MdCloudDone, MdEditNote, MdVisibility } from "react-icons/md";

const iconMap: Record<string, IconType> = {
  cloud_done: MdCloudDone,
  edit_note: MdEditNote,
  visibility: MdVisibility,
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  iconColor?: string;
  bgColor?: string;
  borderLeft?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  iconColor = "text-primary",
  bgColor = "bg-surface-container-low",
  borderLeft = false,
}: StatsCardProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className={`col-span-12 md:col-span-4 ${bgColor} p-8 rounded-xl flex flex-col justify-between h-48 ${
        borderLeft ? "border-l-4 border-primary" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        {Icon && <Icon className={`${iconColor} text-3xl`} />}
        {trend && (
          <span className="text-xs font-bold text-primary bg-primary-container px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <span className="text-4xl font-headline font-black text-on-surface">
          {value}
        </span>
        <p className="text-sm font-medium text-on-surface-variant uppercase tracking-wider mt-1">
          {title}
        </p>
      </div>
    </div>
  );
}
