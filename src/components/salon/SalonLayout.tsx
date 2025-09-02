import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import SalonSidebar from "./SalonSidebar";

const SalonLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SalonSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SalonLayout;