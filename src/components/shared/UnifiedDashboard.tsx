import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { MetricsCards } from '@/components/lojista/dashboard/MetricsCards';
import { SalesChart } from '@/components/lojista/dashboard/SalesChart';
import { RecentOrders } from '@/components/lojista/dashboard/RecentOrders';
import { QuickActions } from '@/components/lojista/dashboard/QuickActions';
import { B2BMetricsCards } from '@/components/fornecedor/B2BMetricsCards';
import { B2BQuickActions } from '@/components/fornecedor/B2BQuickActions';
import { B2BSalesChart } from '@/components/fornecedor/B2BSalesChart';
import { B2BRecentOrders } from '@/components/fornecedor/B2BRecentOrders';

const getDashboardTitle = (activeProfile: string) => {
  switch (activeProfile) {
    case 'beauty_salon':
      return {
        title: 'Dashboard Salão',
        subtitle: 'Visão geral dos agendamentos e serviços',
      };
    case 'marketplace_store':
      return {
        title: 'Dashboard Lojista',
        subtitle: 'Visão geral do seu negócio e métricas principais',
      };
    case 'b2b_supplier':
      return {
        title: 'Dashboard B2B',
        subtitle: 'Visão geral das suas vendas para lojistas',
      };
    default:
      return {
        title: 'Dashboard',
        subtitle: 'Visão geral do negócio',
      };
  }
};

export const UnifiedDashboard = () => {
  const { activeProfile, isLoading } = useCompanyProfiles();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activeProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">
            Nenhum Perfil Ativo
          </h2>
          <p className="text-muted-foreground">
            Configure os perfis da sua empresa para acessar o dashboard.
          </p>
        </div>
      </div>
    );
  }

  const { title, subtitle } = getDashboardTitle(activeProfile);

  const renderDashboardContent = () => {
    switch (activeProfile) {
      case 'beauty_salon':
        return (
          <div className="space-y-6">
            {/* TODO: Implementar componentes específicos do salão */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Agendamentos Hoje</h3>
                <p className="text-3xl font-bold text-primary">12</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Faturamento</h3>
                <p className="text-3xl font-bold text-green-600">R$ 1,280</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Clientes</h3>
                <p className="text-3xl font-bold text-blue-600">45</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Serviços</h3>
                <p className="text-3xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </div>
        );

      case 'marketplace_store':
        return (
          <div className="space-y-6">
            <MetricsCards />
            <SalesChart />
            <div className="grid gap-6 md:grid-cols-2">
              <RecentOrders />
              <QuickActions />
            </div>
          </div>
        );

      case 'b2b_supplier':
        return (
          <div className="space-y-6">
            <B2BMetricsCards />
            <B2BQuickActions />
            <B2BSalesChart />
            <B2BRecentOrders />
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Selecione um perfil para visualizar o dashboard.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {renderDashboardContent()}
    </div>
  );
};