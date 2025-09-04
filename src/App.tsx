
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SalonList from "./pages/SalonList";
import SalonDetail from "./pages/SalonDetail";

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
import FornecedorCatalogo from "./pages/fornecedor/Catalogo";
import FornecedorPedidos from "./pages/fornecedor/Pedidos";
import FornecedorClientes from "./pages/fornecedor/Clientes";
import FornecedorConfiguracoes from "./pages/fornecedor/Configuracoes";

// Admin Pages
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Funcionarios from "./pages/Admin/Funcionarios";
import Servicos from "./pages/Admin/Servicos";
import Estoque from "./pages/Admin/Estoque";
import Chat from "./pages/Admin/Chat";
import Configuracoes from "./pages/Admin/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/salons" element={<SalonList />} />
            <Route path="/salons/:id" element={<SalonDetail />} />
            
            {/* Marketplace Routes */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/produtos/:id" element={<ProductDetail />} />
            <Route path="/marketplace/cart" element={<Cart />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Lojista Routes */}
            <Route path="/lojista" element={<LojistaLayout />}>
              <Route path="dashboard" element={<LojistaDashboard />} />
              <Route path="produtos" element={<LojistaProdutos />} />
              <Route path="pedidos" element={<LojistaPedidos />} />
              <Route path="configuracoes" element={<LojistaConfiguracoes />} />
              <Route path="fornecedores" element={<LojistaFornecedores />} />
              <Route index element={<LojistaDashboard />} />
            </Route>
            
            {/* Fornecedor Routes */}
            <Route path="/fornecedor" element={<FornecedorLayout />}>
              <Route path="dashboard" element={<FornecedorDashboard />} />
              <Route path="catalogo" element={<FornecedorCatalogo />} />
              <Route path="pedidos" element={<FornecedorPedidos />} />
              <Route path="clientes" element={<FornecedorClientes />} />
              <Route path="configuracoes" element={<FornecedorConfiguracoes />} />
              <Route index element={<FornecedorDashboard />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="funcionarios" element={<Funcionarios />} />
              <Route path="servicos" element={<Servicos />} />
              <Route path="estoque" element={<Estoque />} />
              <Route path="chat" element={<Chat />} />
              <Route path="configuracoes" element={<Configuracoes />} />
              <Route index element={<Dashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
