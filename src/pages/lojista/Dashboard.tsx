import { MetricsCards } from "@/components/lojista/dashboard/MetricsCards";
import { SalesChart } from "@/components/lojista/dashboard/SalesChart";
import { RecentOrders } from "@/components/lojista/dashboard/RecentOrders";
import { QuickActions } from "@/components/lojista/dashboard/QuickActions";

const LojistaDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-purple-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-purple-800">Dashboard</h1>
        <p className="text-lg text-purple-500">Visão geral do seu negócio e métricas principais</p>
      </div>

      <MetricsCards />
      
      <SalesChart />
      
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <RecentOrders />
        <QuickActions />
      </div>
    </div>
  );
};

export default LojistaDashboard;