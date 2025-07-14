import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LojistaLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Painel do Lojista</h1>
          <p className="text-muted-foreground">Gerencie seus produtos e vendas</p>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LojistaLayout;