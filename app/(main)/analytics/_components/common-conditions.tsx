import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const conditionFrequencyData = [
  { condition: "Hypertension", cases: 420, trend: "+8%" },
  { condition: "Diabetes", cases: 380, trend: "+12%" },
  { condition: "Arthritis", cases: 280, trend: "+5%" },
  { condition: "GERD", cases: 220, trend: "-2%" },
  { condition: "Asthma", cases: 190, trend: "+3%" },
  { condition: "Migraines", cases: 160, trend: "+6%" },
];

export default function MostCommonCondition() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          Most Common Conditions
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Patient cases and trend indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conditionFrequencyData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-1.5 bg-muted/30 rounded-lg border-2"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {item.condition}
                </p>
                <div className="w-full bg-border rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(item.cases / 450) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-card-foreground text-sm">
                  {item.cases}
                </p>
                <p
                  className={`text-xs ${item.trend.includes("-") ? "text-red-600" : "text-green-600"}`}
                >
                  {item.trend}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
