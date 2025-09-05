import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import SalonList from "./pages/SalonList";
import SalonDetail from "./pages/SalonDetail";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

// Marketplace Pages
import Marketplace from "./pages/marketplace/Marketplace";
import ProductDetail from "./pages/marketplace/ProductDetail";
import Cart from "./pages/marketplace/Cart";
import Checkout from "./pages/marketplace/Checkout";

// Lojista Pages
import LojistaLayout from "./components/lojista/LojistaLayout";
import LojistaDashboard from "./pages/lojista/Dashboard";
import LojistaProdutos from "./pages/lojista/Produtos";
import LojistaFornecedores from "./pages/lojista/Fornecedores";
import LojistaPedidos from "./pages/lojista/Pedidos";
import LojistaConfiguracoes from "./pages/lojista/Configuracoes";

// Fornecedor Pages
import FornecedorLayout from "./components/fornecedor/FornecedorLayout";
import FornecedorDashboard from "./pages/fornecedor/Dashboard";
import FornecedorProdutos from "./pages/fornecedor/Produtos";
import FornecedorPedidos from "./pages/fornecedor/Pedidos";
import FornecedorClientes from "./pages/fornecedor/Clientes";
import FornecedorConfiguracoes from "./pages/fornecedor/Configuracoes";

// Admin Pages
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminFuncionarios from "./pages/Admin/Funcionarios";
import AdminServicos from "./pages/Admin/Servicos";
import AdminEstoque from "./pages/Admin/Estoque";
import AdminChat from "./pages/Admin/Chat";
import AdminConfiguracoes from "./pages/Admin/Configuracoes";
import AdminPerfis from "./pages/Admin/Perfis";
import AdminAgendamentos from "./pages/Admin/Agendamentos";

// Unified Layout
import UnifiedLayout from "./components/shared/UnifiedLayout";
import { UnifiedDashboard } from "./components/shared/UnifiedDashboard";

// Super Admin Layout and Pages
import SuperAdminLayout from "./components/SuperAdmin/SuperAdminLayout";
import SuperAdminProtectedRoute from "./components/SuperAdmin/SuperAdminProtectedRoute";
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import SuperAdminEmpresas from "./pages/SuperAdmin/Empresas";
import SuperAdminUsuarios from "./pages/SuperAdmin/Usuarios";



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/salons" element={<SalonList />} />
                <Route path="/salon/:id" element={<SalonDetail />} />
                <Route path="/booking" element={<Booking />} />
                
                {/* Marketplace Routes */}
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Super Admin Routes */}
                <Route path="/super-admin/*" element={
                  <SuperAdminProtectedRoute>
                    <SuperAdminLayout />
                  </SuperAdminProtectedRoute>
                }>
                  <Route path="dashboard" element={<SuperAdminDashboard />} />
                  <Route path="empresas" element={<SuperAdminEmpresas />} />
                  <Route path="usuarios" element={<SuperAdminUsuarios />} />
                  <Route path="perfis" element={<div>Perfis - Em desenvolvimento</div>} />
                  <Route path="planos" element={<div>Planos - Em desenvolvimento</div>} />
                  <Route path="configuracoes" element={<div>Configurações - Em desenvolvimento</div>} />
                  <Route path="auditoria" element={<div>Auditoria - Em desenvolvimento</div>} />
                </Route>

                {/* Unified Admin Area */}
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <UnifiedLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<UnifiedDashboard />} />
                  <Route path="dashboard" element={<UnifiedDashboard />} />
                  <Route path="funcionarios" element={<AdminFuncionarios />} />
                  <Route path="servicos" element={<AdminServicos />} />
                  <Route path="agendamentos" element={<AdminAgendamentos />} />
                  <Route path="estoque" element={<AdminEstoque />} />
                  <Route path="chat" element={<AdminChat />} />
                  <Route path="perfis" element={<AdminPerfis />} />
                  <Route path="configuracoes" element={<AdminConfiguracoes />} />
                </Route>

                {/* Lojista routes */}
                <Route path="/lojista" element={
                  <ProtectedRoute>
                    <LojistaLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<LojistaDashboard />} />
                  <Route path="dashboard" element={<LojistaDashboard />} />
                  <Route path="produtos" element={<LojistaProdutos />} />
                  <Route path="pedidos" element={<LojistaPedidos />} />
                  <Route path="fornecedores" element={<LojistaFornecedores />} />
                  <Route path="configuracoes" element={<LojistaConfiguracoes />} />
                </Route>
                
                {/* Fornecedor routes */}
                <Route path="/fornecedor" element={
                  <ProtectedRoute>
                    <FornecedorLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<FornecedorDashboard />} />
                  <Route path="dashboard" element={<FornecedorDashboard />} />
                  <Route path="produtos" element={<FornecedorProdutos />} />
                  <Route path="pedidos" element={<FornecedorPedidos />} />
                  <Route path="clientes" element={<FornecedorClientes />} />
                  <Route path="configuracoes" element={<FornecedorConfiguracoes />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;