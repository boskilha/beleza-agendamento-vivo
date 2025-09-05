
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  UserCheck,
  Scissors,
  Boxes,
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
    icon: BarChart3,
  },
  {
    title: "Agendamentos",
    path: "/admin/agendamentos",
    icon: Calendar,
  },
  {
    title: "Funcionários",
    path: "/admin/funcionarios",
    icon: UserCheck,
  },
  {
    title: "Serviços",
    path: "/admin/servicos",
    icon: Scissors,
  },
  {
    title: "Estoque",
    path: "/admin/estoque",
    icon: Boxes,
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

const AdminSidebar = React.memo(() => {
  const location = useLocation();
  
  return (
    <Sidebar side="left" collapsible="icon" className="bg-sidebar border-r border-border/50">
      <SidebarRail />
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-primary p-2.5 shadow-sm">
            <Scissors size={20} className="text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h1 className="font-semibold text-lg text-sidebar-foreground">ELLO</h1>
            <p className="text-xs text-sidebar-foreground/70">
              Área Administrativa
            </p>
          </div>
        </div>
        <SidebarTrigger className="absolute right-4 top-4 text-sidebar-foreground/70 hover:text-sidebar-foreground" />
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarMenu className="space-y-1 px-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.title}
                  className={`
                    h-10 rounded-md transition-all duration-200 ease-in-out
                    ${location.pathname === item.path 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }
                  `}
                >
                  <Link to={item.path} className="flex items-center gap-3 px-3">
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-3 group-data-[collapsible=icon]:hidden">
        <div className="bg-card/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">Plano Free</p>
              <p className="text-xs text-muted-foreground truncate">5 serviços disponíveis</p>
            </div>
            <Link 
              to="/admin/upgrade" 
              className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
});

export default AdminSidebar;
