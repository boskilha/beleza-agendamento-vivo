import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Truck,
  Settings,
  Store,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileSelector } from "@/components/shared/ProfileSelector";
import { useCompanyProfiles } from "@/hooks/useCompanyProfiles";

const menuItems = [
  {
    title: "Dashboard",
    path: "/lojista/dashboard",
    icon: BarChart3,
  },
  {
    title: "Produtos",
    path: "/lojista/produtos",
    icon: Package,
  },
  {
    title: "Pedidos",
    path: "/lojista/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Fornecedores",
    path: "/lojista/fornecedores",
    icon: Truck,
  },
  {
    title: "Configurações",
    path: "/lojista/configuracoes",
    icon: Settings,
  },
];

export const LojistaSidebar = React.memo(() => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const { availableTypes } = useCompanyProfiles();

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Store className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Loja Virtual</h2>
              <p className="text-xs text-sidebar-muted-foreground">Marketplace Store</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted-foreground">Marketplace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
                Básico
              </Badge>
            </div>
            <p className="text-xs text-sidebar-muted-foreground leading-relaxed">
              Faça upgrade para acessar mais funcionalidades
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