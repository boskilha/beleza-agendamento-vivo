import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Package } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  product: string;
  value: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

const orders: Order[] = [
  {
    id: "#1234",
    customer: "João Silva",
    product: "Smartphone XYZ",
    value: "R$ 899,00",
    status: "pending",
    date: "15/07/2025"
  },
  {
    id: "#1235",
    customer: "Maria Santos",
    product: "Tênis Esportivo",
    value: "R$ 199,00",
    status: "processing",
    date: "15/07/2025"
  },
  {
    id: "#1236",
    customer: "Pedro Costa",
    product: "Livro Técnico",
    value: "R$ 89,00",
    status: "shipped",
    date: "14/07/2025"
  },
  {
    id: "#1237",
    customer: "Ana Oliveira",
    product: "Fone Bluetooth",
    value: "R$ 149,00",
    status: "delivered",
    date: "14/07/2025"
  },
];

const statusConfig = {
  pending: { label: "Pendente", variant: "secondary" as const },
  processing: { label: "Processando", variant: "default" as const },
  shipped: { label: "Enviado", variant: "outline" as const },
  delivered: { label: "Entregue", variant: "secondary" as const },
};

export function RecentOrders() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-purple-700 rounded-t-xl flex flex-row items-center justify-between">
        <CardTitle className="text-white">Pedidos Recentes</CardTitle>
        <Button variant="outline" size="sm" className="bg-white text-purple-700 hover:bg-purple-50">
          <Package className="h-4 w-4 mr-2" />
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="space-y-4 pt-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-purple-800">{order.id}</span>
                  <Badge variant={statusConfig[order.status].variant}>
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
                <p className="text-sm text-purple-600">
                  {order.customer} • {order.product}
                </p>
                <p className="text-sm font-medium text-purple-800">{order.value}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-600">{order.date}</span>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}