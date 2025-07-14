import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FornecedorLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Painel do Fornecedor</h1>
          <p className="text-muted-foreground">Gerencie seu catálogo e pedidos B2B</p>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FornecedorLayout;