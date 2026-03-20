import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  title: string;
  icon: ReactNode;
  content: ReactNode;
};

export default function KPICard({ title, icon, content }: Props) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-card-foreground">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
