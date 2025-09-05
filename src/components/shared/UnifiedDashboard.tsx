import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { MetricsCards } from '@/components/lojista/dashboard/MetricsCards';
import { SalesChart } from '@/components/lojista/dashboard/SalesChart';
import { RecentOrders } from '@/components/lojista/dashboard/RecentOrders';
import { QuickActions } from '@/components/lojista/dashboard/QuickActions';
import { B2BMetricsCards } from '@/components/fornecedor/B2BMetricsCards';
import { B2BQuickActions } from '@/components/fornecedor/B2BQuickActions';
import { B2BSalesChart } from '@/components/fornecedor/B2BSalesChart';
import { B2BRecentOrders } from '@/components/fornecedor/B2BRecentOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, User, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const { activeProfile, isLoading, hasProfiles, inactiveProfilesCount } = useCompanyProfiles();
  const navigate = useNavigate();

  console.log('UnifiedDashboard - activeProfile:', activeProfile);
  console.log('UnifiedDashboard - isLoading:', isLoading);
  console.log('UnifiedDashboard - hasProfiles:', hasProfiles);
  console.log('UnifiedDashboard - inactiveProfilesCount:', inactiveProfilesCount);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activeProfile) {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-6">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-orange-100 p-3">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Nenhum Perfil Ativo
            </CardTitle>
            <CardDescription className="text-base">
              {hasProfiles 
                ? `Você tem ${inactiveProfilesCount} perfil(s) disponível(eis) para ativação.`
                : 'Configure os perfis da sua empresa para acessar o dashboard.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Perfis Disponíveis</p>
                <p className="text-xs text-muted-foreground">
                  {hasProfiles 
                    ? `${inactiveProfilesCount} perfil(s) aguardando ativação`
                    : 'Nenhum perfil configurado ainda'
                  }
                </p>
              </div>
              {hasProfiles && (
                <Badge variant="outline" className="ml-auto">
                  {inactiveProfilesCount}
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/admin/perfis')}
                className="w-full"
                size="lg"
              >
                <Settings className="h-4 w-4 mr-2" />
                {hasProfiles ? 'Ativar Perfis' : 'Configurar Perfis'}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Ative pelo menos um perfil para acessar o dashboard completo
              </p>
            </div>
          </CardContent>
        </Card>
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
        <p className="text-xs text-muted-foreground mt-2">
          Perfil ativo atual: {activeProfile || 'Nenhum'}
        </p>
      </div>

      {renderDashboardContent()}
    </div>
  );
};