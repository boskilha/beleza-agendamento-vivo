// Optimized sidebar with React.memo and better performance
import React, { useMemo, memo } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Calendar,
  Settings,
  Users,
  BarChart3,
  Package,
  ShoppingCart,
  Scissors,
  Store,
  Factory,
  UserCheck,
  Boxes,
  FileText,
  Truck,
  Building2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { ProfileSelector } from './ProfileSelector';
import { useCompanyProfiles } from '@/hooks/useCompanyProfiles';
import { BusinessType } from '@/types/business';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  profiles: BusinessType[];
}

// Moved outside component to prevent recreation on each render
const menuItems: MenuItem[] = [
  // Beauty Salon (Salão de Beleza)
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: BarChart3,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Agendamentos',
    path: '/admin/agendamentos',
    icon: Calendar,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Serviços',
    path: '/admin/servicos',
    icon: Scissors,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Funcionários',
    path: '/admin/funcionarios',
    icon: UserCheck,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Estoque',
    path: '/admin/estoque',
    icon: Boxes,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Perfis',
    path: '/admin/perfis',
    icon: Building2,
    profiles: ['beauty_salon'],
  },
  {
    title: 'Configurações',
    path: '/admin/configuracoes',
    icon: Settings,
    profiles: ['beauty_salon'],
  },

  // Marketplace Store (Lojista)
  {
    title: 'Dashboard',
    path: '/lojista',
    icon: BarChart3,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Produtos',
    path: '/lojista/produtos',
    icon: Package,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Pedidos',
    path: '/lojista/pedidos',
    icon: ShoppingCart,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Fornecedores',
    path: '/lojista/fornecedores',
    icon: Truck,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Perfis',
    path: '/admin/perfis',
    icon: Building2,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Configurações',
    path: '/lojista/configuracoes',
    icon: Settings,
    profiles: ['marketplace_store'],
  },

  // B2B Supplier (Fornecedor)
  {
    title: 'Dashboard',
    path: '/fornecedor',
    icon: BarChart3,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Pedidos',
    path: '/fornecedor/pedidos',
    icon: FileText,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Clientes',
    path: '/fornecedor/clientes',
    icon: Users,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Perfis',
    path: '/admin/perfis',
    icon: Building2,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Configurações',
    path: '/fornecedor/configuracoes',
    icon: Settings,
    profiles: ['b2b_supplier'],
  },
];

// Memoized menu icon component
const MenuIcon = memo(({ activeProfile }: { activeProfile: BusinessType | null }) => {
  if (!activeProfile) return <Store className="h-5 w-5" />;
  
  switch (activeProfile) {
    case 'beauty_salon':
      return <Scissors className="h-5 w-5" />;
    case 'marketplace_store':
      return <Store className="h-5 w-5" />;
    case 'b2b_supplier':
      return <Factory className="h-5 w-5" />;
    default:
      return <Store className="h-5 w-5" />;
  }
});

MenuIcon.displayName = 'MenuIcon';

// Memoized company name function
const getCompanyName = (activeProfile: BusinessType | null): string => {
  switch (activeProfile) {
    case 'beauty_salon':
      return 'Beleza Agendamento';
    case 'marketplace_store':
      return 'Marketplace Store';
    case 'b2b_supplier':
      return 'B2B Supplier';
    default:
      return 'Gestão Empresarial';
  }
};

export const UnifiedSidebar = memo(() => {
  const { state } = useSidebar();
  const location = useLocation();
  const { activeProfile, availableTypes } = useCompanyProfiles();
  
  const collapsed = state === 'collapsed';

  // Optimized menu filtering with proper memoization
  const filteredMenuItems = useMemo(() => {
    if (!activeProfile) return [];
    return menuItems.filter(item => item.profiles.includes(activeProfile));
  }, [activeProfile]);

  // Memoized company name
  const companyName = useMemo(() => getCompanyName(activeProfile), [activeProfile]);

  return (
    <Sidebar
      className={`${
        collapsed ? 'w-14' : 'w-60'
      } bg-gradient-to-b from-background to-muted/50 border-r border-border/50`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        {!collapsed && (
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <MenuIcon activeProfile={activeProfile} />
              <div>
                <h2 className="font-semibold text-sm">{companyName}</h2>
                <p className="text-xs text-muted-foreground">Gestão Integrada</p>
              </div>
            </div>
            
            {availableTypes.length > 1 && (
              <ProfileSelector />
            )}
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item, index) => (
                <SidebarMenuItem key={`${item.title}-${item.path}-${index}`}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary'
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter>
          <div className="p-3 text-xs text-muted-foreground">
            <p>Plano: Empresarial</p>
            <button className="text-primary hover:underline cursor-pointer">
              Fazer upgrade
            </button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
});

UnifiedSidebar.displayName = 'UnifiedSidebar';