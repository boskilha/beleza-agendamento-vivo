
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
    <Sidebar side="left" collapsible="icon">
      <SidebarRail />
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex items-center justify-center rounded-md bg-purple-800 p-2 text-white">
            <Scissors size={24} />
          </div>
          <div className="font-serif text-lg font-medium">Beleza Vivo</div>
        </div>
        <div className="mx-2 mt-2 text-xs text-muted-foreground">
          Área Administrativa
        </div>
        <SidebarTrigger className="absolute right-2 top-3" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.path}
                  tooltip={item.title}
                >
                  <Link to={item.path}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div>
            <p className="text-sm font-medium">Plano Free</p>
            <p className="text-xs text-muted-foreground">5 serviços disponíveis</p>
          </div>
          <Link 
            to="/admin/upgrade" 
            className="text-xs text-purple-800 hover:text-purple-900 hover:underline"
          >
            Upgrade
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
