import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LojistaSidebar } from "./LojistaSidebar";

const LojistaLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <LojistaSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4" />
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold">Painel do Lojista</h1>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LojistaLayout;