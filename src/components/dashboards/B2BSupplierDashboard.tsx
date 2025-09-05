import { B2BMetricsCards } from "@/components/fornecedor/B2BMetricsCards";
import { B2BQuickActions } from "@/components/fornecedor/B2BQuickActions";
import { B2BSalesChart } from "@/components/fornecedor/B2BSalesChart";
import { B2BRecentOrders } from "@/components/fornecedor/B2BRecentOrders";

export const B2BSupplierDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard B2B</h1>
        <p className="text-muted-foreground">Visão geral das suas vendas para lojistas</p>
      </div>

      <B2BMetricsCards />
      <B2BQuickActions />
      <B2BSalesChart />
      <B2BRecentOrders />
    </div>
  );
};