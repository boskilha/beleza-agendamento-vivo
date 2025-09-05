import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { BeautySalonDashboard } from '@/components/dashboards/BeautySalonDashboard';
import { MarketplaceStoreDashboard } from '@/components/dashboards/MarketplaceStoreDashboard';
import { B2BSupplierDashboard } from '@/components/dashboards/B2BSupplierDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, User, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const renderDashboardByProfile = (activeProfile: string) => {
  console.log('renderDashboardByProfile chamado com:', activeProfile);
  
  switch (activeProfile) {
    case 'beauty_salon':
      return <BeautySalonDashboard />;
    case 'marketplace_store':
      return <MarketplaceStoreDashboard />;
    case 'b2b_supplier':
      return <B2BSupplierDashboard />;
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

  return (
    <div className="space-y-6">
      {renderDashboardByProfile(activeProfile)}
    </div>
  );
};