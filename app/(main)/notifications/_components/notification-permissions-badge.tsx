import { Badge, BadgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeConfig = {
  [K: string]: {
    label: string;
    variant: BadgeVariants;
    className?: string;
  };
};
export default function NotificationPermissionBadge({
  permission,
}: {
  permission: string;
}) {
  const config: BadgeConfig = {
    granted: {
      label: "Enabled",
      variant: "default",
      className: "bg-green-600",
    },
    denied: {
      label: "Blocked",
      variant: "destructive",
    },
    default: {
      label: "Not set",
      variant: "outline",
    },
    unknown: {
      label: "Unknown",
      variant: "outline",
    },
  } as const;

  const c = config[permission as keyof typeof config] ?? config.unknown;

  return (
    <Badge variant={c.variant} className={cn(c.className)}>
      {c.label}
    </Badge>
  );
}
