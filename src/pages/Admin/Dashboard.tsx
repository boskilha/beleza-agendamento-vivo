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
