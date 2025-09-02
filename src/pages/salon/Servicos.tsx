import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Clock, DollarSign, Scissors, Users } from "lucide-react";

const ServicosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    {
      id: 1,
      name: "Corte Feminino",
      category: "Cabelo",
      duration: 60,
      price: 80,
      description: "Corte personalizado para cabelo feminino",
      professionals: ["Ana Costa", "Julia Santos"],
      popular: true,
    },
    {
      id: 2,
      name: "Escova",
      category: "Cabelo", 
      duration: 45,
      price: 50,
      description: "Escova modeladora com secador",
      professionals: ["Ana Costa", "Maria Silva"],
      popular: true,
    },
    {
      id: 3,
      name: "Corte Masculino",
      category: "Cabelo",
      duration: 45,
      price: 60,
      description: "Corte masculino tradicional e moderno",
      professionals: ["Carlos Lima", "Roberto Silva"],
      popular: false,
    },
    {
      id: 4,
      name: "Barba",
      category: "Barba",
      duration: 30,
      price: 35,
      description: "Aparar e modelar barba",
      professionals: ["Carlos Lima", "Roberto Silva"],
      popular: false,
    },
    {
      id: 5,
      name: "Manicure",
      category: "Unhas",
      duration: 60,
      price: 50,
      description: "Cuidados completos para as unhas das mãos",
      professionals: ["Julia Santos", "Maria Silva"],
      popular: true,
    },
    {
      id: 6,
      name: "Pedicure",
      category: "Unhas",
      duration: 90,
      price: 65,
      description: "Cuidados completos para as unhas dos pés",
      professionals: ["Julia Santos"],
      popular: false,
    },
  ];

  const categories = [...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Serviços</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Busca e Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{services.length}</div>
            <div className="text-sm text-muted-foreground">Total de Serviços</div>
          </CardContent>
        </Card>
      </div>

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                {category} ({services.filter(s => s.category === category).length})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-purple-600" />
                  {service.name}
                </CardTitle>
                {service.popular && (
                  <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                )}
              </div>
              <Badge variant="outline">{service.category}</Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                  <DollarSign className="w-5 h-5" />
                  <span>R$ {service.price}</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <Users className="w-4 h-4" />
                  <span>Profissionais:</span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {service.professionals.map((professional, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {professional}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" className="flex-1">
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Scissors className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum serviço encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros de busca
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Serviço
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicosPage;