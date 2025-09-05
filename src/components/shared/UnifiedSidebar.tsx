import { useState, useMemo, useEffect } from 'react';
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
  MessageSquare,
  Boxes,
  ShoppingBag,
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
  icon: any;
  profiles: BusinessType[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: BarChart3,
    profiles: ['beauty_salon', 'marketplace_store', 'b2b_supplier'],
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
    title: 'Produtos',
    path: '/lojista/produtos',
    icon: Package,
    profiles: ['marketplace_store'],
  },
  {
    title: 'Pedidos (Loja)',
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
    title: 'Pedidos B2B',
    path: '/fornecedor/pedidos',
    icon: FileText,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Clientes B2B',
    path: '/fornecedor/clientes',
    icon: Users,
    profiles: ['b2b_supplier'],
  },
  {
    title: 'Estoque',
    path: '/admin/estoque',
    icon: Boxes,
    profiles: ['marketplace_store', 'b2b_supplier'],
  },
  {
    title: 'Chat',
    path: '/admin/chat',
    icon: MessageSquare,
    profiles: ['beauty_salon', 'marketplace_store', 'b2b_supplier'],
  },
  {
    title: 'Perfis',
    path: '/admin/perfis',
    icon: Building2,
    profiles: ['beauty_salon', 'marketplace_store', 'b2b_supplier'],
  },
  {
    title: 'Configurações',
    path: '/admin/configuracoes',
    icon: Settings,
    profiles: ['beauty_salon', 'marketplace_store', 'b2b_supplier'],
  },
];

export function UnifiedSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { activeProfile, availableTypes } = useCompanyProfiles();
  const currentPath = location.pathname;

  const getMenuIcon = () => {
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
  };

  const filteredMenuItems = useMemo(() => {
    if (!activeProfile) return [];
    
    console.log('Filtering menu items for profile:', activeProfile);
    const filtered = menuItems.filter(item => 
      item.profiles.includes(activeProfile)
    );
    console.log('Filtered menu items:', filtered);
    return filtered;
  }, [activeProfile]);

  const getCompanyName = () => {
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

  const collapsed = state === 'collapsed';

  useEffect(() => {
    console.log('UnifiedSidebar: activeProfile changed to:', activeProfile);
    console.log('UnifiedSidebar: filteredMenuItems count:', filteredMenuItems.length);
  }, [activeProfile, filteredMenuItems]);

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
              {getMenuIcon()}
              <div>
                <h2 className="font-semibold text-sm">{getCompanyName()}</h2>
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
              {filteredMenuItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
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
                );
              })}
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
}