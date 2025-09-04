import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BusinessType, BUSINESS_TYPE_LABELS } from '@/types/business';
import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { Factory, Scissors, Store, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
}

const getBusinessIcon = (type: BusinessType) => {
  switch (type) {
    case 'beauty_salon':
      return <Scissors className="h-8 w-8" />;
    case 'marketplace_store':
      return <Store className="h-8 w-8" />;
    case 'b2b_supplier':
      return <Factory className="h-8 w-8" />;
    default:
      return <Store className="h-8 w-8" />;
  }
};

const getBusinessDescription = (type: BusinessType) => {
  switch (type) {
    case 'beauty_salon':
      return 'Ideal para salões de beleza, barbearias e clínicas estéticas. Gerencie agendamentos, serviços e funcionários.';
    case 'marketplace_store':
      return 'Para lojas que vendem produtos online. Gerencie estoque, pedidos e relacionamento com fornecedores.';
    case 'b2b_supplier':
      return 'Para fornecedores que vendem para lojistas. Gerencie pedidos B2B, clientes corporativos e catálogos.';
    default:
      return '';
  }
};

const allBusinessTypes: BusinessType[] = ['beauty_salon', 'marketplace_store', 'b2b_supplier'];

export function ProfileOnboarding({ isOpen, onClose }: ProfileOnboardingProps) {
  const [selectedProfiles, setSelectedProfiles] = useState<BusinessType[]>([]);
  const [step, setStep] = useState(1);
  const [isActivating, setIsActivating] = useState(false);
  const { activateProfile } = useCompanyProfiles();

  const handleProfileToggle = (type: BusinessType) => {
    setSelectedProfiles(prev => 
      prev.includes(type) 
        ? prev.filter(p => p !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    if (selectedProfiles.length === 0) {
      toast.error('Selecione pelo menos um perfil para continuar');
      return;
    }
    setStep(2);
  };

  const handleComplete = async () => {
    setIsActivating(true);
    
    try {
      // Ativar todos os perfis selecionados
      for (const profile of selectedProfiles) {
        await activateProfile(profile);
      }
      
      toast.success(`${selectedProfiles.length} perfil(s) ativado(s) com sucesso!`);
      onClose();
    } catch (error) {
      console.error('Erro ao ativar perfis:', error);
      toast.error('Erro ao ativar perfis. Tente novamente.');
    } finally {
      setIsActivating(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedProfiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Configurar Perfis da Empresa</DialogTitle>
          <DialogDescription>
            {step === 1 
              ? 'Selecione os tipos de negócio que sua empresa opera'
              : 'Confirme os perfis selecionados'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-1">
              {allBusinessTypes.map((type) => {
                const isSelected = selectedProfiles.includes(type);
                
                return (
                  <Card 
                    key={type} 
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleProfileToggle(type)}
                  >
                    <CardContent className="flex items-center gap-4 p-6">
                      <Checkbox 
                        checked={isSelected}
                        onChange={() => handleProfileToggle(type)}
                      />
                      
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-primary">
                          {getBusinessIcon(type)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {BUSINESS_TYPE_LABELS[type]}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getBusinessDescription(type)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={resetAndClose}>
                Cancelar
              </Button>
              <Button onClick={handleNext} disabled={selectedProfiles.length === 0}>
                Continuar
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configuração Pronta!</h3>
              <p className="text-muted-foreground mb-4">
                Você selecionou {selectedProfiles.length} perfil(s) para sua empresa:
              </p>
              
              <div className="flex justify-center gap-2 flex-wrap">
                {selectedProfiles.map((type) => (
                  <div 
                    key={type}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {getBusinessIcon(type)}
                    <span>{BUSINESS_TYPE_LABELS[type]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">O que acontece a seguir:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Os perfis serão ativados para sua empresa</li>
                <li>• Você poderá alternar entre perfis na barra lateral</li>
                <li>• Cada perfil terá suas próprias funcionalidades e configurações</li>
                <li>• Você pode adicionar ou remover perfis a qualquer momento</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button onClick={handleComplete} disabled={isActivating}>
                {isActivating ? 'Ativando...' : 'Finalizar Configuração'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}