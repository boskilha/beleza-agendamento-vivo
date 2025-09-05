import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  FileText,
  BarChart3,
  Crown
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/super-admin/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Empresas',
    path: '/super-admin/empresas',
    icon: Building2,
  },
  {
    title: 'Usuários',
    path: '/super-admin/usuarios',
    icon: Users,
  },
  {
    title: 'Perfis',
    path: '/super-admin/perfis',
    icon: ShieldCheck,
  },
  {
    title: 'Planos',
    path: '/super-admin/planos',
    icon: CreditCard,
  },
  {
    title: 'Configurações',
    path: '/super-admin/configuracoes',
    icon: Settings,
  },
  {
    title: 'Auditoria',
    path: '/super-admin/auditoria',
    icon: FileText,
  },
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
            <Crown className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Super Admin</h2>
              <p className="text-xs text-slate-600">Portal Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Portal Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
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
        <SidebarFooter className="border-t border-slate-200 p-4">
          <div className="text-xs text-slate-500">
            Portal Administrator
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}