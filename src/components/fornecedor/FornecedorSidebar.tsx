import { Factory, BarChart3, Package, ShoppingCart, Users, Settings, Crown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
const menuItems = [{
  title: "Dashboard",
  path: "/fornecedor/dashboard",
  icon: BarChart3
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
  const {
    state
  } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  return <Sidebar className="bg-gradient-to-b from-b2b via-b2b-muted to-b2b border-r border-b2b-border">
      <SidebarContent className="bg-transparent">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-b2b-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-b2b-primary to-blue-600 flex items-center justify-center shadow-lg shadow-b2b-primary/25">
              <Factory className="h-5 w-5 text-white" />
            </div>
            {!collapsed && <div>
                <h1 className="font-bebas tracking-tight text-xl font-bold text-b2b-foreground">ELLO</h1>
                <p className="text-xs text-b2b-accent-foreground">Portal B2B</p>
              </div>}
          </div>
          <SidebarTrigger className="text-b2b-accent-foreground hover:text-b2b-foreground hover:bg-b2b-border rounded-lg p-1.5 transition-colors" />
        </div>

        {/* Menu */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`
                      rounded-xl h-12 px-4 transition-all duration-200 ease-in-out
                      ${isActive(item.path) ? "bg-gradient-to-r from-b2b-primary to-blue-600 text-b2b-primary-foreground shadow-lg shadow-b2b-primary/25 scale-105" : "text-b2b-accent-foreground hover:bg-b2b-hover hover:text-b2b-hover-foreground hover:scale-102"}
                    `}>
                    <NavLink to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-b2b-muted to-b2b-border/80 backdrop-blur-sm rounded-xl p-4 border border-b2b-border">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-b2b-primary" />
                <span className="text-sm font-medium text-b2b-foreground">Plano B2B Pro</span>
              </div>
              <p className="text-xs text-b2b-accent-foreground mb-3">
                Maximize suas vendas para lojistas
              </p>
              <button className="w-full bg-gradient-to-r from-b2b-primary to-blue-600 text-b2b-primary-foreground text-xs font-medium py-2 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-b2b-primary/25">
                Upgrade
              </button>
            </div>
          </div>}
      </SidebarContent>
    </Sidebar>;
}