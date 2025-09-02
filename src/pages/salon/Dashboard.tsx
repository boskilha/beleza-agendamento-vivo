import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Scissors, TrendingUp, Clock, Star, DollarSign } from "lucide-react";

const SalonDashboard = () => {
  const metrics = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      change: "+8%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Clientes Ativos",
      value: "284",
      change: "+15%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Serviços Realizados",
      value: "45",
      change: "+22%",
      icon: Scissors,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 18.500",
      change: "+12%",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  const nextAppointments = [
    { time: "09:00", client: "Maria Silva", service: "Corte + Escova", professional: "Ana" },
    { time: "10:30", client: "João Santos", service: "Barba", professional: "Carlos" },
    { time: "11:00", client: "Lucia Costa", service: "Manicure", professional: "Julia" },
    { time: "14:00", client: "Pedro Lima", service: "Corte Masculino", professional: "Roberto" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard do Salão</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-green-600 font-medium">
                    {metric.change} vs mês anterior
                  </p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {appointment.time}
                    </div>
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {appointment.professional}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Estatísticas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Avaliação Média</span>
              </div>
              <span className="text-lg font-bold">4.8</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium">Novos Clientes</span>
              </div>
              <span className="text-lg font-bold">23</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Scissors className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Serviços Populares</span>
              </div>
              <span className="text-sm">Corte + Escova</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium">Tempo Médio</span>
              </div>
              <span className="text-lg font-bold">75min</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonDashboard;