import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, Eye } from "lucide-react";
import PedidosReais from "./PedidosReais";

const mockOrders = [
  {
    id: "#1234",
    customer: "João Silva",
    products: "Smartphone XYZ, Fone Bluetooth",
    total: "R$ 1.048,00",
    status: "pending",
    date: "15/07/2025",
    payment: "Cartão de Crédito"
  },
  {
    id: "#1235",
    customer: "Maria Santos",
    products: "Tênis Esportivo",
    total: "R$ 199,00",
    status: "processing",
    date: "15/07/2025",
    payment: "PIX"
  },
  {
    id: "#1236",
    customer: "Pedro Costa",
    products: "Livro Técnico, Caderno",
    total: "R$ 119,00",
    status: "shipped",
    date: "14/07/2025",
    payment: "Boleto"
  },
  {
    id: "#1237",
    customer: "Ana Oliveira",
    products: "Fone Bluetooth",
    total: "R$ 149,00",
    status: "delivered",
    date: "14/07/2025",
    payment: "Cartão de Débito"
  }
];

const statusConfig = {
  pending: { label: "Pendente", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processando", variant: "default" as const, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", variant: "outline" as const, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregue", variant: "secondary" as const, color: "bg-green-100 text-green-800" },
};

const LojistaPedidos = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-gray-600">Gerencie todos os pedidos recebidos</p>
        </div>
      </div>

      <Tabs defaultValue="real" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="real" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Pedidos do Marketplace
          </TabsTrigger>
          <TabsTrigger value="mock" className="gap-2">
            <Package className="h-4 w-4" />
            Pedidos Exemplo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="real">
          <PedidosReais />
        </TabsContent>

        <TabsContent value="mock">
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Cliente</p>
                      <p className="text-sm text-gray-900">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Produtos</p>
                      <p className="text-sm text-gray-900">{order.products}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Pagamento</p>
                      <p className="text-sm text-gray-900">{order.payment}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-lg font-bold text-green-700">
                      {order.total}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LojistaPedidos;