import { 
  Home, 
  Calendar, 
  Users, 
  Scissors, 
  BarChart, 
  Settings, 
  Star,
  Clock,
  CreditCard
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/salon/dashboard",
    icon: Home,
  },
  {
    title: "Agendamentos",
    url: "/salon/agendamentos",
    icon: Calendar,
  },
  {
    title: "Clientes",
    url: "/salon/clientes",
    icon: Users,
  },
  {
    title: "Serviços",
    url: "/salon/servicos",
    icon: Scissors,
  },
  {
    title: "Funcionários",
    url: "/salon/funcionarios",
    icon: Users,
  },
  {
    title: "Horários",
    url: "/salon/horarios",
    icon: Clock,
  },
  {
    title: "Financeiro",
    url: "/salon/financeiro",
    icon: CreditCard,
  },
  {
    title: "Avaliações",
    url: "/salon/avaliacoes",
    icon: Star,
  },
  {
    title: "Relatórios",
    url: "/salon/relatorios",
    icon: BarChart,
  },
  {
    title: "Configurações",
    url: "/salon/configuracoes",
    icon: Settings,
  },
];

const SalonSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar 
      className={`${state === 'collapsed' ? 'w-14' : 'w-64'} bg-gradient-to-b from-pink-600 to-purple-800 border-r-0 transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarHeader className="bg-transparent border-b border-pink-500/30 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          {state === 'expanded' && (
            <div>
              <h1 className="font-bebas tracking-tight text-white text-xl font-bold">ELLO</h1>
              <p className="text-pink-100 text-sm">Serviços Admin</p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto text-white hover:bg-white/10" />
      </SidebarHeader>

      <SidebarContent className="bg-transparent py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2 px-3">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      location.pathname === item.url
                        ? "bg-white/20 text-white font-medium shadow-lg"
                        : "text-pink-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {state === 'expanded' && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-transparent border-t border-pink-500/30 p-4">
        <div className="text-pink-100 text-sm">
          {state === 'expanded' && (
            <>
              <p>Bem-vindo!</p>
              <p className="text-xs opacity-75">Gerenciamento de Serviços</p>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SalonSidebar;