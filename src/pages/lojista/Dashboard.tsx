import { MetricsCards } from "@/components/lojista/dashboard/MetricsCards";
import { SalesChart } from "@/components/lojista/dashboard/SalesChart";
import { RecentOrders } from "@/components/lojista/dashboard/RecentOrders";
import { QuickActions } from "@/components/lojista/dashboard/QuickActions";

const LojistaDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu negócio e métricas principais.
        </p>
      </div>

      <MetricsCards />
      
      <SalesChart />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <QuickActions />
      </div>
    </div>
  );
};

export default LojistaDashboard;