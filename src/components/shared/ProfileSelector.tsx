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
          className="w-full justify-between h-10 px-3 py-2 bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <div className="flex items-center gap-2">
            {getBusinessIcon(activeProfile)}
            <span className="text-sm font-medium truncate">
              {BUSINESS_TYPE_LABELS[activeProfile]}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-sidebar border-sidebar-border">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-sidebar-muted-foreground mb-2">Alternar Perfil</p>
        </div>
        {availableTypes.map((type) => (
          <DropdownMenuItem
            key={type}
            onClick={() => handleProfileSwitch(type)}
            className={`flex items-center gap-3 px-3 py-2.5 mx-1 rounded-md text-sm transition-colors ${
              activeProfile === type 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
            }`}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sidebar-primary/10">
              {getBusinessIcon(type)}
            </div>
            <span className="flex-1">{BUSINESS_TYPE_LABELS[type]}</span>
            {activeProfile === type && (
              <div className="h-2 w-2 rounded-full bg-sidebar-primary"></div>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="my-1 bg-sidebar-border" />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 mx-1 rounded-md text-sm text-sidebar-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
          <div className="flex h-6 w-6 items-center justify-center">
            <Settings className="h-4 w-4" />
          </div>
          <span>Gerenciar Perfis</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}