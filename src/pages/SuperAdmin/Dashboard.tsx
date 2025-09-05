import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, ShieldCheck, CreditCard, TrendingUp, Activity } from 'lucide-react';

interface DashboardStats {
  totalCompanies: number;
  totalUsers: number;
  activeProfiles: number;
  freeCompanies: number;
  recentActivity: number;
}

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCompanies: 0,
    totalUsers: 0,
    activeProfiles: 0,
    freeCompanies: 0,
    recentActivity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get companies count
        const { count: companiesCount } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true });

        // Get users count
        const { count: usersCount } = await supabase
          .from('company_users')
          .select('*', { count: 'exact', head: true });

        // Get active profiles count
        const { count: profilesCount } = await supabase
          .from('company_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        // Get free plan companies
        const { count: freeCount } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true })
          .eq('subscription_plan', 'free');

        // Recent activity (companies created in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { count: recentCount } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', thirtyDaysAgo.toISOString());

        setStats({
          totalCompanies: companiesCount || 0,
          totalUsers: usersCount || 0,
          activeProfiles: profilesCount || 0,
          freeCompanies: freeCount || 0,
          recentActivity: recentCount || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Empresas',
      value: stats.totalCompanies,
      description: 'Empresas cadastradas no portal',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total de Usuários',
      value: stats.totalUsers,
      description: 'Usuários ativos no sistema',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Perfis Ativos',
      value: stats.activeProfiles,
      description: 'Perfis de negócio configurados',
      icon: ShieldCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Planos Gratuitos',
      value: stats.freeCompanies,
      description: 'Empresas no plano free',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Crescimento (30d)',
      value: stats.recentActivity,
      description: 'Novas empresas este mês',
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Status do Sistema',
      value: '99.9%',
      description: 'Uptime do portal',
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Visão geral do portal</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Visão geral do portal de administração</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {card.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{card.value}</div>
              <CardDescription className="text-xs text-slate-500">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Sistema funcionando normalmente</span>
                <span className="text-xs text-slate-400">Agora</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Backup automático realizado</span>
                <span className="text-xs text-slate-400">2h atrás</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">Relatório mensal gerado</span>
                <span className="text-xs text-slate-400">1 dia atrás</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Estatísticas Rápidas</CardTitle>
            <CardDescription>Métricas importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Taxa de Conversão</span>
                <span className="text-sm font-medium text-slate-900">12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Satisfação do Cliente</span>
                <span className="text-sm font-medium text-slate-900">4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Tempo Médio de Resposta</span>
                <span className="text-sm font-medium text-slate-900">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;