import { Factory, BarChart3, Package, ShoppingCart, Users, Settings, Crown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, SidebarHeader, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { ProfileSelector } from "@/components/shared/ProfileSelector";
import { useCompanyProfiles } from "@/hooks/useCompanyProfiles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const menuItems = [{
  title: "Dashboard",
  path: "/fornecedor/dashboard",
  icon: BarChart3
}, {
  title: "Produtos",
  path: "/fornecedor/produtos",
  icon: Package
}, {
  title: "Pedidos",
  path: "/fornecedor/pedidos",
  icon: ShoppingCart
}, {
  title: "Clientes B2B",
  path: "/fornecedor/clientes",
  icon: Users
}, {
  title: "Configurações",
  path: "/fornecedor/configuracoes",
  icon: Settings
}];
export function FornecedorSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { availableTypes } = useCompanyProfiles();
  return <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Factory className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Fornecedor B2B</h2>
              <p className="text-xs text-sidebar-muted-foreground">Portal B2B</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted-foreground">Portal B2B</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
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
                </SidebarMenuItem>)}
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
                B2B Pro
              </Badge>
            </div>
            <p className="text-xs text-sidebar-muted-foreground leading-relaxed">
              Maximize suas vendas para lojistas
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
    </Sidebar>;
}