import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Package } from "lucide-react";

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
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Pedidos</h2>
        <p className="text-muted-foreground">
          Gerencie todos os pedidos da sua loja.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar pedidos..." 
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status do pedido" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="processing">Processando</SelectItem>
            <SelectItem value="shipped">Enviados</SelectItem>
            <SelectItem value="delivered">Entregues</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Mais Filtros
        </Button>
      </div>

      <div className="grid gap-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{order.id}</h3>
                    <Badge 
                      variant={statusConfig[order.status as keyof typeof statusConfig].variant}
                      className={statusConfig[order.status as keyof typeof statusConfig].color}
                    >
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">{order.products}</p>
                  <p className="text-sm text-muted-foreground">Pagamento: {order.payment}</p>
                </div>
                
                <div className="text-right space-y-2">
                  <p className="text-lg font-bold text-primary">{order.total}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      Ações
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LojistaPedidos;