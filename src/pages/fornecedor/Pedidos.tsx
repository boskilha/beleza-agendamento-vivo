import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Calendar,
  ShoppingBag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type OrderStatus = "pendente" | "confirmado" | "preparando" | "enviado" | "entregue" | "cancelado";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  image?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: Address;
  orderDate: Date;
  estimatedDelivery?: Date;
  notes?: string;
}

const FornecedorPedidos = () => {
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "PED-2024-001",
      customer: {
        id: "1",
        name: "Maria Silva",
        email: "maria@salonbela.com",
        phone: "(11) 99999-9999",
        company: "Salão Bela Vida"
      },
      items: [
        {
          id: "1",
          name: "Óleo de Argan Premium",
          quantity: 5,
          price: 45.90,
          unit: "ml"
        },
        {
          id: "2",
          name: "Shampoo Base Neutro",
          quantity: 10,
          price: 25.50,
          unit: "ml"
        }
      ],
      total: 484.50,
      status: "pendente",
      paymentMethod: "Cartão de Crédito",
      deliveryAddress: {
        street: "Rua das Flores",
        number: "123",
        complement: "Sala 45",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      orderDate: new Date("2024-01-15"),
      estimatedDelivery: new Date("2024-01-22"),
      notes: "Entregar no horário comercial"
    },
    {
      id: "2",
      orderNumber: "PED-2024-002",
      customer: {
        id: "2",
        name: "João Santos",
        email: "joao@espacobem.com",
        phone: "(11) 88888-8888",
        company: "Espaço Bem Estar"
      },
      items: [
        {
          id: "3",
          name: "Essência de Lavanda",
          quantity: 3,
          price: 35.00,
          unit: "ml"
        }
      ],
      total: 105.00,
      status: "confirmado",
      paymentMethod: "PIX",
      deliveryAddress: {
        street: "Av. Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100"
      },
      orderDate: new Date("2024-01-14"),
      estimatedDelivery: new Date("2024-01-21")
    },
    {
      id: "3",
      orderNumber: "PED-2024-003",
      customer: {
        id: "3",
        name: "Ana Costa",
        email: "ana@studiohair.com",
        phone: "(11) 77777-7777",
        company: "Studio Hair"
      },
      items: [
        {
          id: "1",
          name: "Óleo de Argan Premium",
          quantity: 2,
          price: 45.90,
          unit: "ml"
        }
      ],
      total: 91.80,
      status: "enviado",
      paymentMethod: "Cartão de Débito",
      deliveryAddress: {
        street: "Rua Augusta",
        number: "500",
        neighborhood: "Consolação",
        city: "São Paulo",
        state: "SP",
        zipCode: "01305-000"
      },
      orderDate: new Date("2024-01-12"),
      estimatedDelivery: new Date("2024-01-19")
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const statusConfig = {
    pendente: { 
      label: "Pendente", 
      color: "bg-yellow-100 text-yellow-800", 
      icon: Clock 
    },
    confirmado: { 
      label: "Confirmado", 
      color: "bg-blue-100 text-blue-800", 
      icon: CheckCircle 
    },
    preparando: { 
      label: "Preparando", 
      color: "bg-orange-100 text-orange-800", 
      icon: Package 
    },
    enviado: { 
      label: "Enviado", 
      color: "bg-purple-100 text-purple-800", 
      icon: Truck 
    },
    entregue: { 
      label: "Entregue", 
      color: "bg-green-100 text-green-800", 
      icon: CheckCircle 
    },
    cancelado: { 
      label: "Cancelado", 
      color: "bg-red-100 text-red-800", 
      icon: AlertCircle 
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Status atualizado!",
      description: `Pedido ${orders.find(o => o.id === orderId)?.orderNumber} alterado para ${statusConfig[newStatus].label}`
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getOrdersByStatus = (status: OrderStatus) => 
    orders.filter(order => order.status === status);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pedidos Recebidos</h2>
          <p className="text-muted-foreground">Gerencie pedidos B2B dos seus clientes</p>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por número, cliente ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <SelectItem key={status} value={status}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs por Status */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">
            Todos ({orders.length})
          </TabsTrigger>
          {Object.entries(statusConfig).map(([status, config]) => (
            <TabsTrigger key={status} value={status}>
              {config.label} ({getOrdersByStatus(status as OrderStatus).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <OrdersList 
            orders={filteredOrders} 
            statusConfig={statusConfig}
            onStatusChange={handleStatusChange}
            onViewDetails={handleViewDetails}
          />
        </TabsContent>

        {Object.keys(statusConfig).map(status => (
          <TabsContent key={status} value={status}>
            <OrdersList 
              orders={getOrdersByStatus(status as OrderStatus)} 
              statusConfig={statusConfig}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal de Detalhes */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && <OrderDetailsModal order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Componente para lista de pedidos
const OrdersList = ({ 
  orders, 
  statusConfig, 
  onStatusChange, 
  onViewDetails 
}: {
  orders: Order[];
  statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }>;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onViewDetails: (order: Order) => void;
}) => {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500">
              Não há pedidos correspondentes aos filtros selecionados.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const StatusIcon = statusConfig[order.status].icon;
        
        return (
          <Card key={order.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                    <Badge className={statusConfig[order.status].color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.customer.company} - {order.customer.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Pedido em {order.orderDate.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                <div className="text-right space-y-2">
                  <p className="font-bold text-lg">R$ {order.total.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(order)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Select
                      value={order.status}
                      onValueChange={(value) => onStatusChange(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <SelectItem key={status} value={status}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Itens:</p>
                  <p className="font-medium">{order.items.length} produto(s)</p>
                </div>
                <div>
                  <p className="text-gray-500">Pagamento:</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500">Entrega prevista:</p>
                  <p className="font-medium">
                    {order.estimatedDelivery?.toLocaleDateString('pt-BR') || 'A definir'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

// Modal de detalhes do pedido
const OrderDetailsModal = ({ order }: { order: Order }) => {
  return (
    <div className="space-y-6">
      {/* Informações Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Dados do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Empresa</p>
              <p className="font-medium">{order.customer.company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium">{order.customer.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Endereço de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {order.deliveryAddress.street}, {order.deliveryAddress.number}
            </p>
            {order.deliveryAddress.complement && (
              <p className="text-gray-600">{order.deliveryAddress.complement}</p>
            )}
            <p className="text-gray-600">
              {order.deliveryAddress.neighborhood} - {order.deliveryAddress.city}/{order.deliveryAddress.state}
            </p>
            <p className="text-gray-600">CEP: {order.deliveryAddress.zipCode}</p>
          </CardContent>
        </Card>
      </div>

      {/* Itens do Pedido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Itens do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantidade: {item.quantity} {item.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)} cada</p>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Datas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Data do Pedido</p>
              <p className="font-medium">{order.orderDate.toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Entrega Prevista</p>
              <p className="font-medium">
                {order.estimatedDelivery?.toLocaleDateString('pt-BR') || 'A definir'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {order.notes || 'Nenhuma observação adicional.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FornecedorPedidos;