
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  Users2,
  Scissors,
  Package,
  MessagesSquare,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: CalendarDays,
  },
  {
    title: "Funcionários",
    path: "/admin/funcionarios",
    icon: Users2,
  },
  {
    title: "Serviços",
    path: "/admin/servicos",
    icon: Scissors,
  },
  {
    title: "Estoque",
    path: "/admin/estoque",
    icon: Package,
  },
  {
    title: "Chat",
    path: "/admin/chat",
    icon: MessagesSquare,
  },
  {
    title: "Configurações",
    path: "/admin/configuracoes",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar side="left" collapsible="icon" className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 border-r-0">
      <SidebarRail />
      <SidebarHeader className="bg-transparent border-b border-purple-700/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 p-3 shadow-lg">
            <Scissors size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <div className="font-bebas tracking-tight text-xl font-bold text-white">ELLO</div>
            <div className="text-xs text-purple-200 opacity-90">
              Área Administrativa
            </div>
          </div>
        </div>
        <SidebarTrigger className="absolute right-3 top-4 text-purple-200 hover:text-white hover:bg-purple-700/50 transition-colors" />
      </SidebarHeader>
      
      <SidebarContent className="bg-transparent py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2 px-3">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.title}
                  className={`
                    relative group h-12 rounded-xl transition-all duration-200 ease-in-out
                    ${location.pathname === item.path 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105' 
                      : 'text-purple-100 hover:bg-white hover:text-purple-800 hover:scale-102'
                    }
                    data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500 data-[active=true]:to-purple-600
                    data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-purple-500/25
                  `}
                >
                  <Link to={item.path} className="flex items-center gap-3 px-4">
                    <item.icon className={`
                      w-5 h-5 transition-transform duration-200
                      ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'}
                    `} />
                    <span className="font-medium">{item.title}</span>
                    {location.pathname === item.path && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-purple-600/20 blur-sm" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="bg-transparent border-t border-purple-700/50 p-4">
        <div className="bg-gradient-to-r from-purple-800/50 to-purple-700/50 backdrop-blur-sm rounded-xl p-4 border border-purple-600/30">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Plano Free</p>
              <p className="text-xs text-purple-200 opacity-80">5 serviços disponíveis</p>
            </div>
            <Link 
              to="/admin/upgrade" 
              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-medium rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
