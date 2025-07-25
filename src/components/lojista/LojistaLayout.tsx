import React from "react";
import { Outlet } from "react-router-dom";
import { LojistaSidebar } from "./LojistaSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const LojistaLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <LojistaSidebar />
        <div className="flex-1 overflow-x-hidden">
          <main className="w-full px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LojistaLayout;