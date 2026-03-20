import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import KPICard from "@/components/kpi-card";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Users,
} from "lucide-react";

const KpiCards = [
  {
    title: "Total Patients",
    icon: <Users className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">2,847</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-4 w-4 text-green-600" />
          <span className="text-xs text-muted-foreground">
            +12% from last month
          </span>
        </div>
      </>
    ),
  },

  {
    title: "Pending Appointments",
    icon: <Clock className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">28</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowDownRight className="h-4 w-4 text-red-600" />
          <span className="text-xs text-muted-foreground">
            -5% from last week
          </span>
        </div>
      </>
    ),
  },
  {
    title: "New Patients",
    icon: <Users className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">62</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-4 w-4 text-green-600" />
          <span className="text-xs text-muted-foreground">
            +18% from last week
          </span>
        </div>
      </>
    ),
  },
  {
    title: "Upcoming Appointments",
    icon: <Clock className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">23</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowDownRight className="h-4 w-4 text-red-600" />
          <span className="text-xs text-muted-foreground">
            -4% from last week
          </span>
        </div>
      </>
    ),
  },
];
export default function DashboardPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {KpiCards.map(({ content, icon, title }, index) => (
            <KPICard
              key={title + index}
              title={title}
              icon={icon}
              content={content}
            />
          ))}
        </div>
      </div>
    </>
  );
}
