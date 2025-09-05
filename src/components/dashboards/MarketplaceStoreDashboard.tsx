import { MetricsCards } from "@/components/lojista/dashboard/MetricsCards";
import { SalesChart } from "@/components/lojista/dashboard/SalesChart";
import { RecentOrders } from "@/components/lojista/dashboard/RecentOrders";
import { QuickActions } from "@/components/lojista/dashboard/QuickActions";

export const MarketplaceStoreDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Lojista</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio e métricas principais</p>
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