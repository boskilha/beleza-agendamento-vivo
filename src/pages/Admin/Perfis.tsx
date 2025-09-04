import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { BusinessType, BUSINESS_TYPE_LABELS, BUSINESS_TYPE_ICONS } from '@/types/business';
import { Factory, Scissors, Store, Plus, Settings, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

const getBusinessIcon = (type: BusinessType) => {
  switch (type) {
    case 'beauty_salon':
      return <Scissors className="h-5 w-5" />;
    case 'marketplace_store':
      return <Store className="h-5 w-5" />;
    case 'b2b_supplier':
      return <Factory className="h-5 w-5" />;
    default:
      return <Store className="h-5 w-5" />;
  }
};

const allBusinessTypes: BusinessType[] = ['beauty_salon', 'marketplace_store', 'b2b_supplier'];

const PerfilsPage = () => {
  const { profiles, availableTypes, allProfileTypes, activateProfile, deactivateProfile, isLoading } = useCompanyProfiles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleProfile = async (businessType: BusinessType, isActive: boolean) => {
    const profile = profiles.find(p => p.business_type === businessType);
    
    if (isActive) {
      // Se o perfil existe e está sendo desativado
      if (profile) {
        await deactivateProfile(businessType);
      }
    } else {
      // Se o perfil não existe ou está sendo ativado
      await activateProfile(businessType);
    }
  };

  const getProfileDescription = (type: BusinessType) => {
    switch (type) {
      case 'beauty_salon':
        return 'Gerencie agendamentos, serviços e funcionários do seu salão de beleza.';
      case 'marketplace_store':
        return 'Venda produtos online, gerencie estoque e pedidos da sua loja.';
      case 'b2b_supplier':
        return 'Forneça produtos para lojistas, gerencie pedidos B2B e clientes corporativos.';
      default:
        return '';
    }
  };

  const activeProfilesCount = availableTypes.length;
  const maxProfiles = 3;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Perfis da Empresa</h1>
          <p className="text-muted-foreground">
            Gerencie os tipos de negócio da sua empresa
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Perfil</DialogTitle>
              <DialogDescription>
                Selecione um tipo de negócio para adicionar aos perfis da sua empresa.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {allBusinessTypes
                .filter(type => !allProfileTypes.includes(type))
                .map((type) => (
                  <Card 
                    key={type} 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      activateProfile(type);
                      setIsDialogOpen(false);
                    }}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      {getBusinessIcon(type)}
                      <div>
                        <h3 className="font-semibold">{BUSINESS_TYPE_LABELS[type]}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getProfileDescription(type)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {allBusinessTypes.filter(type => !allProfileTypes.includes(type)).length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Todos os perfis disponíveis já foram criados para sua empresa.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allBusinessTypes.map((type) => {
          const profile = profiles.find(p => p.business_type === type);
          const isActive = profile?.is_active || false;
          const profileExists = !!profile;
          
          return (
            <Card key={type} className={`relative ${!isActive ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getBusinessIcon(type)}
                    <div>
                      <CardTitle className="text-lg">{BUSINESS_TYPE_LABELS[type]}</CardTitle>
                      <CardDescription className="text-sm">
                        {getProfileDescription(type)}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {profileExists ? (
                      <Switch
                        checked={isActive}
                        onCheckedChange={(checked) => handleToggleProfile(type, !checked)}
                      />
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Não criado
                      </Badge>
                    )}
                    {isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Ativo
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {isActive && profileExists && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Configurado
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Criado em:</span>
                      <span>
                        {profile ? new Date(profile.created_at).toLocaleDateString('pt-BR') : '-'}
                      </span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo dos Perfis</CardTitle>
          <CardDescription>
            Informações sobre os perfis ativos da sua empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{activeProfilesCount}</div>
              <div className="text-sm text-muted-foreground">Perfis Ativos</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-muted-foreground">{maxProfiles - activeProfilesCount}</div>
              <div className="text-sm text-muted-foreground">Perfis Disponíveis</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-sm text-muted-foreground">Funcionalidades</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerfilsPage;