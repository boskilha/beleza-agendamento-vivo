
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users2, ClipboardList, TrendingUp } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Dashboard = () => {
  // Sample data for demonstration
  const recentAppointments = [
    { id: 1, client: "Maria Silva", service: "Corte de Cabelo", date: "2025-05-09", time: "14:00", status: "Confirmado" },
    { id: 2, client: "João Pereira", service: "Barba", date: "2025-05-09", time: "15:30", status: "Pendente" },
    { id: 3, client: "Ana Santos", service: "Manicure", date: "2025-05-10", time: "10:00", status: "Confirmado" },
    { id: 4, client: "Pedro Costa", service: "Corte e Barba", date: "2025-05-10", time: "11:30", status: "Pendente" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu salão de beleza</p>
      </div>

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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.client}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
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
