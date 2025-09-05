import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Factory, Scissors, Store, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { BusinessType, BUSINESS_TYPE_LABELS } from '@/types/business';

const getBusinessIcon = (type: BusinessType) => {
  switch (type) {
    case 'beauty_salon':
      return <Scissors className="h-4 w-4" />;
    case 'marketplace_store':
      return <Store className="h-4 w-4" />;
    case 'b2b_supplier':
      return <Factory className="h-4 w-4" />;
    default:
      return <Store className="h-4 w-4" />;
  }
};

export function ProfileSelector() {
  const { activeProfile, availableTypes, switchProfile } = useCompanyProfiles();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileSwitch = (type: BusinessType) => {
    console.log('Switching to profile:', type);
    switchProfile(type);
    
    // Navegar para o dashboard específico do perfil
    switch (type) {
      case 'beauty_salon':
        navigate('/admin/dashboard');
        break;
      case 'marketplace_store':
        navigate('/lojista');
        break;
      case 'b2b_supplier':
        navigate('/fornecedor');
        break;
      default:
        navigate('/admin/dashboard');
    }
    
    setIsOpen(false);
  };

  if (!activeProfile || availableTypes.length <= 1) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-background/80 backdrop-blur-sm border-border/50"
        >
          <div className="flex items-center gap-2">
            {getBusinessIcon(activeProfile)}
            <span className="text-sm font-medium">
              {BUSINESS_TYPE_LABELS[activeProfile]}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {availableTypes.map((type) => (
          <DropdownMenuItem
            key={type}
             onClick={() => handleProfileSwitch(type)}
             className={`flex items-center gap-2 ${
               activeProfile === type ? 'bg-muted' : ''
             }`}
           >
             {getBusinessIcon(type)}
             <span>{BUSINESS_TYPE_LABELS[type]}</span>
           </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Gerenciar Perfis</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}