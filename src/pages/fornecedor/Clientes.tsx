import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ShoppingBag,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ClientStatus = "ativo" | "inativo";

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Client {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  cnpj: string;
  address: Address;
  status: ClientStatus;
  registrationDate: Date;
  lastOrderDate?: Date;
  totalOrders: number;
  totalSpent: number;
  notes?: string;
}

interface ClientForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  cnpj: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  status: ClientStatus;
  notes: string;
}

const FornecedorClientes = () => {
  const { toast } = useToast();
  
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      companyName: "Salão Bela Vida",
      contactName: "Maria Silva",
      email: "maria@salonbela.com",
      phone: "(11) 99999-9999",
      cnpj: "12.345.678/0001-90",
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Sala 45",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      status: "ativo",
      registrationDate: new Date("2023-08-15"),
      lastOrderDate: new Date("2024-01-15"),
      totalOrders: 15,
      totalSpent: 7890.50,
      notes: "Cliente preferencial, sempre paga em dia"
    },
    {
      id: "2",
      companyName: "Espaço Bem Estar",
      contactName: "João Santos",
      email: "joao@espacobem.com",
      phone: "(11) 88888-8888",
      cnpj: "98.765.432/0001-10",
      address: {
        street: "Av. Paulista",
        number: "1000",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100"
      },
      status: "ativo",
      registrationDate: new Date("2023-10-20"),
      lastOrderDate: new Date("2024-01-14"),
      totalOrders: 8,
      totalSpent: 3245.80,
      notes: "Especializado em tratamentos corporais"
    },
    {
      id: "3",
      companyName: "Studio Hair",
      contactName: "Ana Costa",
      email: "ana@studiohair.com",
      phone: "(11) 77777-7777",
      cnpj: "11.222.333/0001-44",
      address: {
        street: "Rua Augusta",
        number: "500",
        neighborhood: "Consolação",
        city: "São Paulo",
        state: "SP",
        zipCode: "01305-000"
      },
      status: "inativo",
      registrationDate: new Date("2023-05-10"),
      lastOrderDate: new Date("2023-12-05"),
      totalOrders: 3,
      totalSpent: 890.30,
      notes: "Último pedido há mais de 30 dias"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  const [formData, setFormData] = useState<ClientForm>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    cnpj: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    status: "ativo",
    notes: ""
  });

  const handleInputChange = (field: keyof ClientForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const required = [
      'companyName', 'contactName', 'email', 'phone', 'cnpj',
      'street', 'number', 'neighborhood', 'city', 'state', 'zipCode'
    ];
    
    for (const field of required) {
      if (!formData[field as keyof ClientForm]) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive"
        });
        return false;
      }
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newClient: Client = {
      id: editingClient?.id || Date.now().toString(),
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      cnpj: formData.cnpj,
      address: {
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      status: formData.status,
      registrationDate: editingClient?.registrationDate || new Date(),
      lastOrderDate: editingClient?.lastOrderDate,
      totalOrders: editingClient?.totalOrders || 0,
      totalSpent: editingClient?.totalSpent || 0,
      notes: formData.notes
    };

    if (editingClient) {
      setClients(prev => prev.map(client => client.id === editingClient.id ? newClient : client));
      toast({ title: "Sucesso!", description: "Cliente atualizado com sucesso" });
    } else {
      setClients(prev => [...prev, newClient]);
      toast({ title: "Sucesso!", description: "Cliente cadastrado com sucesso" });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      cnpj: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      status: "ativo",
      notes: ""
    });
    setEditingClient(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      companyName: client.companyName,
      contactName: client.contactName,
      email: client.email,
      phone: client.phone,
      cnpj: client.cnpj,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement || "",
      neighborhood: client.address.neighborhood,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      status: client.status,
      notes: client.notes || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
    toast({ title: "Sucesso!", description: "Cliente removido com sucesso" });
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm);
    
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const activeClients = clients.filter(client => client.status === "ativo");
  const inactiveClients = clients.filter(client => client.status === "inativo");

  const statusConfig = {
    ativo: { 
      label: "Ativo", 
      color: "bg-green-100 text-green-800", 
      icon: CheckCircle 
    },
    inativo: { 
      label: "Inativo", 
      color: "bg-red-100 text-red-800", 
      icon: XCircle 
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clientes B2B</h2>
          <p className="text-muted-foreground">Gerencie seus lojistas cadastrados</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-purple-800 hover:bg-purple-900">
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Cliente
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Editar Cliente" : "Cadastrar Novo Cliente"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Dados da Empresa */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Ex: Salão Bela Vida"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange("cnpj", e.target.value)}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados do Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Nome do Contato *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Nome da pessoa responsável"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: ClientStatus) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="contato@empresa.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Endereço</h3>
                <div>
                  <Label htmlFor="zipCode">CEP *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <Label htmlFor="street">Rua *</Label>
                    <Input
                      id="street"
                      value={formData.street}
                      onChange={(e) => handleInputChange("street", e.target.value)}
                      placeholder="Nome da rua"
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => handleInputChange("number", e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={formData.complement}
                    onChange={(e) => handleInputChange("complement", e.target.value)}
                    placeholder="Apartamento, sala, etc."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Nome da cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <Label htmlFor="notes">Observações</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Informações adicionais sobre o cliente"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-purple-800 hover:bg-purple-900">
                  {editingClient ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por empresa, contato, email ou CNPJ..."
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
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="inativo">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs por Status */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            Todos ({clients.length})
          </TabsTrigger>
          <TabsTrigger value="ativo">
            Ativos ({activeClients.length})
          </TabsTrigger>
          <TabsTrigger value="inativo">
            Inativos ({inactiveClients.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ClientsList 
            clients={filteredClients} 
            statusConfig={statusConfig}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="ativo">
          <ClientsList 
            clients={activeClients} 
            statusConfig={statusConfig}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="inativo">
          <ClientsList 
            clients={inactiveClients} 
            statusConfig={statusConfig}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente para lista de clientes
const ClientsList = ({ 
  clients, 
  statusConfig, 
  onEdit, 
  onDelete 
}: {
  clients: Client[];
  statusConfig: Record<ClientStatus, { label: string; color: string; icon: React.ComponentType<any> }>;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}) => {
  if (clients.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum cliente encontrado
            </h3>
            <p className="text-gray-500">
              Não há clientes correspondentes aos filtros selecionados.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => {
        const StatusIcon = statusConfig[client.status].icon;
        
        return (
          <Card key={client.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{client.companyName}</CardTitle>
                  <p className="text-sm text-gray-600">{client.contactName}</p>
                </div>
                <Badge className={statusConfig[client.status].color}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig[client.status].label}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span>{client.cnpj}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">
                    {client.address.city}/{client.address.state}
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Pedidos:</p>
                  <p className="font-medium">{client.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-500">Valor Total:</p>
                  <p className="font-medium">R$ {client.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-500">Último Pedido:</p>
                <p className="font-medium">
                  {client.lastOrderDate 
                    ? client.lastOrderDate.toLocaleDateString('pt-BR')
                    : 'Nenhum pedido'
                  }
                </p>
              </div>
              
              <Separator />
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(client)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(client.id)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FornecedorClientes;