import { cn } from "@/lib/utils";
import {
  IconRobot,
  IconMessage,
  IconLayoutDashboard,
  IconBuilding
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Structured Reporting",
      description:
        "Transform messy chat conversations into structured daily progress and blocker reports.",
      icon: <IconMessage />,
    },
    {
      title: "Automated Daily SyncBot",
      description:
        "Our bot automatically reminds your team at 09:00 AM every day. No more manual chasing.",
      icon: <IconRobot />,
    },
    {
      title: "One-Screen Dashboard",
      description:
        "Managers get a complete overview of project health without scrolling through group chats.",
      icon: <IconLayoutDashboard />,
    },
    {
      title: "Multi-Tenant Isolation",
      description: "Manage multiple companies or teams in one system securely with distinct workspaces.",
      icon: <IconBuilding />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r border-slate-200 py-10 relative group/feature dark:border-slate-800",
        (index === 0 || index === 4) && "lg:border-l border-slate-200 dark:border-slate-800",
        index < 4 && "lg:border-b border-slate-200 dark:border-slate-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
