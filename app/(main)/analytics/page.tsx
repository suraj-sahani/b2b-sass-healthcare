import KPICard from "@/components/kpi-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Heart,
  TrendingDown,
} from "lucide-react";
import { ReadmissionChart } from "./_components/readmission-chart";
import MostCommonCondition from "./_components/common-conditions";
import { VisitorsChart } from "./_components/visitors-chart";

const AnalyticsKpiCards = [
  {
    title: "Re-admissions Rate",
    icon: <TrendingDown className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">6.5%</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowDownRight className="h-4 w-4 text-red-600" />
          <span className="text-xs text-muted-foreground">
            -1.7% from last month
          </span>
        </div>
      </>
    ),
  },
  {
    title: "Problem Satisfaction Rate",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">4.6/5</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-4 w-4 text-green-600" />
          <span className="text-xs text-muted-foreground">
            +0.4 from last month
          </span>
        </div>
      </>
    ),
  },
  {
    title: "No-Show Rate",
    icon: <AlertTriangle className="h-5 w-5 text-secondary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">4.2%</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowDownRight className="h-4 w-4 text-green-600" />
          <span className="text-xs text-muted-foreground">
            -2.1% from last month
          </span>
        </div>
      </>
    ),
  },
  {
    title: "Clinical Success Rate",
    icon: <CheckCircle className="h-5 w-5 text-primary" />,
    content: (
      <>
        <div className="text-3xl font-bold text-card-foreground">87%</div>
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight className="h-4 w-4 text-green-600" />
          <span className="text-xs text-muted-foreground">
            +3% from last month
          </span>
        </div>
      </>
    ),
  },
];

export default function AnalyticsPage() {
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AnalyticsKpiCards.map(({ content, icon, title }, index) => (
            <KPICard
              key={title + index}
              title={title}
              icon={icon}
              content={content}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="col-span-2">
            <ReadmissionChart />
          </div>

          <MostCommonCondition />

          <VisitorsChart />
        </div>
      </div>
    </>
  );
}
