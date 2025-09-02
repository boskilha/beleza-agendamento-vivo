import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Search, Plus, Filter } from "lucide-react";

const Agendamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const appointments = [
    {
      id: 1,
      time: "09:00",
      client: "Maria Silva",
      phone: "(11) 99999-1111",
      service: "Corte + Escova",
      professional: "Ana Costa",
      duration: "90min",
      price: "R$ 120,00",
      status: "confirmado",
    },
    {
      id: 2,
      time: "10:30",
      client: "João Santos",
      phone: "(11) 99999-2222",
      service: "Barba",
      professional: "Carlos Lima",
      duration: "45min",
      price: "R$ 35,00",
      status: "pendente",
    },
    {
      id: 3,
      time: "11:00",
      client: "Lucia Costa",
      phone: "(11) 99999-3333",
      service: "Manicure",
      professional: "Julia Santos",
      duration: "60min",
      price: "R$ 50,00",
      status: "confirmado",
    },
    {
      id: 4,
      time: "14:00",
      client: "Pedro Lima",
      phone: "(11) 99999-4444",
      service: "Corte Masculino",
      professional: "Roberto Silva",
      duration: "45min",
      price: "R$ 80,00",
      status: "cancelado",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.professional.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agendamentos</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, serviço ou profissional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Hoje
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Agendamentos */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {appointment.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{appointment.client}</h3>
                    <p className="text-muted-foreground">{appointment.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium">{appointment.service}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {appointment.professional}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold text-lg">{appointment.price}</div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="outline">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar os filtros de busca" : "Não há agendamentos para hoje"}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Agendamento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Agendamentos;