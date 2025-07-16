import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Package } from "lucide-react";

interface B2BOrder {
  id: string;
  lojista: string;
  produto: string;
  quantidade: number;
  valor: string;
  status: "pendente" | "processando" | "enviado" | "entregue";
  data: string;
}

const b2bOrders: B2BOrder[] = [
  {
    id: "B2B-001",
    lojista: "Salão Bella Vista",
    produto: "Kit Coloração Premium",
    quantidade: 50,
    valor: "R$ 2.450,00",
    status: "pendente",
    data: "2024-01-15"
  },
  {
    id: "B2B-002", 
    lojista: "Estética & Beleza",
    produto: "Equipamento Laser",
    quantidade: 2,
    valor: "R$ 8.900,00",
    status: "processando",
    data: "2024-01-14"
  },
  {
    id: "B2B-003",
    lojista: "Beauty Center",
    produto: "Suprimentos Diversos",
    quantidade: 100,
    valor: "R$ 1.200,00",
    status: "enviado",
    data: "2024-01-13"
  },
  {
    id: "B2B-004",
    lojista: "Spa Relax",
    produto: "Produtos Capilares",
    quantidade: 30,
    valor: "R$ 890,00",
    status: "entregue",
    data: "2024-01-12"
  }
];

const statusConfig = {
  pendente: { label: "Pendente", variant: "destructive" as const },
  processando: { label: "Processando", variant: "default" as const },
  enviado: { label: "Enviado", variant: "secondary" as const },
  entregue: { label: "Entregue", variant: "outline" as const }
};

export function B2BRecentOrders() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pedidos B2B Recentes</h3>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </div>
      <div className="space-y-4">
        {b2bOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium">{order.id}</span>
                <Badge variant={statusConfig[order.status].variant}>
                  {statusConfig[order.status].label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{order.lojista}</p>
              <p className="text-sm">{order.produto} - Qtd: {order.quantidade}</p>
              <p className="text-sm font-medium text-green-600">{order.valor}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{order.data}</span>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Package className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}