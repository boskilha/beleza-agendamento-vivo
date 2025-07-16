import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.value}
            </span>
            <span>vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MetricsCards() {
  const metrics = [
    {
      title: "Vendas do Mês",
      value: "R$ 12.450,00",
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: "+12.5%", isPositive: true }
    },
    {
      title: "Produtos Ativos",
      value: "48",
      icon: <Package className="h-4 w-4" />,
      trend: { value: "+3", isPositive: true }
    },
    {
      title: "Pedidos Pendentes",
      value: "12",
      icon: <ShoppingCart className="h-4 w-4" />,
      trend: { value: "-2", isPositive: false }
    },
    {
      title: "Clientes Ativos",
      value: "284",
      icon: <Users className="h-4 w-4" />,
      trend: { value: "+8.2%", isPositive: true }
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}