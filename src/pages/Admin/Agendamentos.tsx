import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, Mail, Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes?: string;
  service_id: string;
  employee_id?: string;
  services?: {
    name: string;
    price: number;
    duration: number;
  };
  employees?: {
    name: string;
  };
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Employee {
  id: string;
  name: string;
}

const Agendamentos = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    appointment_date: "",
    appointment_time: "",
    service_id: "",
    employee_id: "",
    notes: "",
  });

  useEffect(() => {
    fetchAppointments();
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Get user's company_id first
      const { data: companyId, error: companyError } = await supabase
        .rpc('get_user_company_id');

      if (companyError) throw companyError;
      if (!companyId) {
        toast.error('Empresa não encontrada');
        return;
      }

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          services:service_id (
            name,
            price,
            duration
          ),
          employees:employee_id (
            name
          )
        `)
        .eq('company_id', companyId)
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      toast.error('Erro ao carregar agendamentos');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      // Get user's company_id first
      const { data: companyId, error: companyError } = await supabase
        .rpc('get_user_company_id');

      if (companyError) throw companyError;
      if (!companyId) return;

      const { data, error } = await supabase
        .from('services')
        .select('id, name, price, duration')
        .eq('active', true)
        .eq('company_id', companyId)
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      // Get user's company_id first
      const { data: companyId, error: companyError } = await supabase
        .rpc('get_user_company_id');

      if (companyError) throw companyError;
      if (!companyId) return;

      const { data, error } = await supabase
        .from('employees')
        .select('id, name')
        .eq('active', true)
        .eq('company_id', companyId)
        .order('name');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAppointment) {
        // Update existing appointment
        const { error } = await supabase
          .from('appointments')
          .update({
            client_name: formData.client_name,
            client_email: formData.client_email,
            client_phone: formData.client_phone,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            service_id: formData.service_id,
            employee_id: formData.employee_id || null,
            notes: formData.notes,
          })
          .eq('id', editingAppointment.id);

        if (error) throw error;
        toast.success('Agendamento atualizado com sucesso!');
      } else {
        // Get user's company_id
        const { data: companyData, error: companyError } = await supabase
          .rpc('get_user_company_id');

        if (companyError) throw companyError;
        if (!companyData) {
          toast.error('Empresa não encontrada');
          return;
        }

        // Create new appointment
        const { error } = await supabase
          .from('appointments')
          .insert({
            client_name: formData.client_name,
            client_email: formData.client_email,
            client_phone: formData.client_phone,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            service_id: formData.service_id,
            employee_id: formData.employee_id || null,
            notes: formData.notes,
            status: 'scheduled',
            company_id: companyData,
          });

        if (error) throw error;
        toast.success('Agendamento criado com sucesso!');
      }

      fetchAppointments();
      resetForm();
      setIsCreateDialogOpen(false);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      toast.error('Erro ao salvar agendamento');
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData({
      client_name: appointment.client_name,
      client_email: appointment.client_email,
      client_phone: appointment.client_phone || "",
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      service_id: appointment.service_id,
      employee_id: appointment.employee_id || "",
      notes: appointment.notes || "",
    });
    setEditingAppointment(appointment);
    setIsCreateDialogOpen(true);
  };

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;

      toast.success(`Agendamento ${newStatus === 'confirmed' ? 'confirmado' : 'cancelado'} com sucesso!`);
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status do agendamento');
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) return;

    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;

      toast.success('Agendamento excluído com sucesso!');
      fetchAppointments();
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast.error('Erro ao excluir agendamento');
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      appointment_date: "",
      appointment_time: "",
      service_id: "",
      employee_id: "",
      notes: "",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'Agendado', className: 'bg-blue-100 text-blue-800' },
      confirmed: { label: 'Confirmado', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
      completed: { label: 'Concluído', className: 'bg-gray-100 text-gray-800' },
      from_cart: { label: 'Do Carrinho', className: 'bg-purple-100 text-purple-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.client_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie os agendamentos do seu salão</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingAppointment(null); }}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
              </DialogTitle>
              <DialogDescription>
                {editingAppointment ? 'Edite as informações do agendamento.' : 'Preencha os dados para criar um novo agendamento.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Nome do Cliente</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_email">Email</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="client_phone">Telefone</Label>
                <Input
                  id="client_phone"
                  value={formData.client_phone}
                  onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="appointment_date">Data</Label>
                  <Input
                    id="appointment_date"
                    type="date"
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="appointment_time">Horário</Label>
                  <Input
                    id="appointment_time"
                    type="time"
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service_id">Serviço</Label>
                <Select value={formData.service_id} onValueChange={(value) => setFormData({ ...formData, service_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - R$ {service.price.toFixed(2)} ({service.duration}min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employee_id">Funcionário (Opcional)</Label>
                <Select value={formData.employee_id} onValueChange={(value) => setFormData({ ...formData, employee_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Observações</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações adicionais..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingAppointment ? 'Atualizar' : 'Criar'} Agendamento
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou email do cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos ({filteredAppointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{appointment.client_name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {appointment.client_email}
                          </div>
                          {appointment.client_phone && (
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {appointment.client_phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div>{format(new Date(appointment.appointment_date), 'dd/MM/yyyy', { locale: ptBR })}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {appointment.appointment_time}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{appointment.services?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            R$ {appointment.services?.price.toFixed(2)} • {appointment.services?.duration}min
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {appointment.employees?.name ? (
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {appointment.employees.name}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {appointment.status === 'scheduled' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(appointment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(appointment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Agendamentos;