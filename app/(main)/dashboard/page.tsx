import KPICard from "@/components/kpi-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowDownRight, ArrowUpRight, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig } from "@/components/ui/chart";
import { departmentStats, recentActivities } from "@/lib/constants";
import Link from "next/link";
import { MonthlyAppointmentChart } from "./_components/monthly-appointment-chart";
import { WeeklyActivityChart } from "./_components/weekly-activity-chart";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/firebase/session";
import { redirect } from "next/navigation";

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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.success) {
    redirect("/login");
  }

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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <WeeklyActivityChart />

          {/* Monthly Activity */}
          <MonthlyAppointmentChart />
        </div>

        {/* Bottom Section - Department Stats and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Performance */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">
                    Department Performance
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Top performing departments
                  </CardDescription>
                </div>
                <Link href="/#">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary hover:text-primary"
                  >
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{dept.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dept.patients} patients • {dept.appointments}{" "}
                        appointments
                      </p>
                    </div>
                    <Badge
                      variant={"outline"}
                      className="text-right bg-slate-100"
                    >
                      <p className="font-bold text-green-600">{dept.growth}</p>
                      <p className="text-xs">Growth</p>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.patient}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
