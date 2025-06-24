import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users2, ClipboardList, TrendingUp } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const metricCards = [
  {
    title: "Agendamentos Hoje",
    value: "8",
    icon: <CalendarDays className="h-8 w-8 text-white" />,
    bg: "from-purple-500 to-purple-700",
    info: "+2% em relação a ontem"
  },
  {
    title: "Novos Clientes",
    value: "5",
    icon: <Users2 className="h-8 w-8 text-white" />,
    bg: "from-pink-500 to-pink-700",
    info: "+12% em relação à semana passada"
  },
  {
    title: "Serviços Cadastrados",
    value: "4",
    icon: <ClipboardList className="h-8 w-8 text-white" />,
    bg: "from-blue-500 to-blue-700",
    info: "de 5 disponíveis no plano Free"
  },
  {
    title: "Faturamento Mensal",
    value: "R$ 2.350",
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    bg: "from-green-500 to-green-700",
    info: "+8% em relação ao mês anterior"
  }
];

const Dashboard = () => {
  // Sample data for demonstration
  const recentAppointments = [
    { id: 1, client: "Maria Silva", service: "Corte de Cabelo", date: "2025-05-09", time: "14:00", status: "Confirmado" },
    { id: 2, client: "João Pereira", service: "Barba", date: "2025-05-09", time: "15:30", status: "Pendente" },
    { id: 3, client: "Ana Santos", service: "Manicure", date: "2025-05-10", time: "10:00", status: "Confirmado" },
    { id: 4, client: "Pedro Costa", service: "Corte e Barba", date: "2025-05-10", time: "11:30", status: "Pendente" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-purple-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-purple-800">Dashboard</h1>
        <p className="text-lg text-purple-500">Visão geral do seu salão de beleza</p>
      </div>

<<<<<<< Updated upstream
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-purple-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Agendamentos Hoje</CardTitle>
            <CalendarDays className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">8</div>
            <p className="text-xs text-purple-600">+2% em relação a ontem</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-100 to-purple-200 border-blue-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Novos Clientes</CardTitle>
            <Users2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">5</div>
            <p className="text-xs text-blue-600">+12% em relação à semana passada</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-100 to-purple-200 border-pink-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-800">Serviços Cadastrados</CardTitle>
            <ClipboardList className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-800">4</div>
            <p className="text-xs text-pink-600">de 5 disponíveis no plano Free</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-100 to-purple-200 border-emerald-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Faturamento Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-800">R$ 2.350</div>
            <p className="text-xs text-emerald-600">+8% em relação ao mês anterior</p>
          </CardContent>
        </Card>
=======
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {metricCards.map((card, idx) => (
          <div
            key={card.title}
            className={`rounded-xl shadow-lg p-3 flex flex-col justify-between bg-gradient-to-br ${card.bg} transition-transform hover:scale-105 min-h-[110px]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-white">{card.title}</span>
              {React.cloneElement(card.icon, { className: "h-6 w-6 text-white" })}
            </div>
            <div className="text-xl font-bold text-white mb-1">{card.value}</div>
            <p className="text-xs text-purple-100">{card.info}</p>
          </div>
        ))}
>>>>>>> Stashed changes
      </div>

      <Card className="shadow-lg">
        <CardHeader className="bg-purple-700 rounded-t-xl">
          <CardTitle className="text-white">Próximos Agendamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100">
                <TableHead className="text-purple-800">Cliente</TableHead>
                <TableHead className="text-purple-800">Serviço</TableHead>
                <TableHead className="text-purple-800">Data</TableHead>
                <TableHead className="text-purple-800">Horário</TableHead>
                <TableHead className="text-purple-800">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAppointments.map((appointment, i) => (
                <TableRow
                  key={appointment.id}
                  className={i % 2 === 0 ? "bg-purple-50" : "bg-white"}
                >
                  <TableCell className="font-medium">{appointment.client}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      appointment.status === "Confirmado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
