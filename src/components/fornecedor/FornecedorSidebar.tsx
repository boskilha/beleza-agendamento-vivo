import { Factory, BarChart3, Package, ShoppingCart, Users, Settings, Crown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
const menuItems = [{
  title: "Dashboard",
  path: "/fornecedor/dashboard",
  icon: BarChart3
}, {
  title: "Catálogo",
  path: "/fornecedor/catalogo",
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
  const {
    state
  } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  return <Sidebar className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 border-r border-purple-700/50">
      <SidebarContent className="bg-transparent">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Factory className="h-5 w-5 text-white" />
            </div>
            {!collapsed && <div>
                <h1 className="font-bebas tracking-tight text-xl font-bold text-white">ELLO</h1>
                <p className="text-xs text-purple-200">Portal B2B</p>
              </div>}
          </div>
          <SidebarTrigger className="text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg p-1.5 transition-colors" />
        </div>

        {/* Menu */}
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`
                      rounded-xl h-12 px-4 transition-all duration-200 ease-in-out
                      ${isActive(item.path) ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105" : "text-purple-100 hover:bg-white hover:text-purple-800 hover:scale-102"}
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
            <div className="bg-gradient-to-r from-purple-800/50 to-purple-700/50 backdrop-blur-sm rounded-xl p-4 border border-purple-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-purple-300" />
                <span className="text-sm font-medium text-purple-100">Plano B2B Pro</span>
              </div>
              <p className="text-xs text-purple-200 mb-3">
                Maximize suas vendas para lojistas
              </p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/25">
                Upgrade
              </button>
            </div>
          </div>}
      </SidebarContent>
    </Sidebar>;
}