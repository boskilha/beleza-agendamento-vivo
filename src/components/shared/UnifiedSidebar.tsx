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
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <MenuIcon activeProfile={activeProfile} />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">{companyName}</h2>
              <p className="text-xs text-sidebar-muted-foreground">Gestão Integrada</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted-foreground">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredMenuItems.map((item, index) => (
                <SidebarMenuItem key={`${item.title}-${item.path}-${index}`}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t border-sidebar-border bg-sidebar p-4">
          <div className="space-y-3">
            {availableTypes.length > 1 && (
              <div className="pb-3 border-b border-sidebar-border">
                <ProfileSelector />
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sidebar-foreground">Plano Atual</span>
              <Badge variant="secondary" className="bg-sidebar-accent text-sidebar-accent-foreground">
                Empresarial
              </Badge>
            </div>
            <p className="text-xs text-sidebar-muted-foreground leading-relaxed">
              Gerencie todos os seus negócios em um só lugar
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:border-sidebar-accent"
            >
              Fazer Upgrade
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
});

UnifiedSidebar.displayName = 'UnifiedSidebar';