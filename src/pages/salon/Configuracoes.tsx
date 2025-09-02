import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, MapPin, Clock, Phone, Mail } from "lucide-react";

const ConfiguracoesSalon = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Configurações de Serviços</h1>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Estabelecimento</Label>
              <Input id="name" placeholder="ELLO Serviços" defaultValue="ELLO Serviços" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                placeholder="Descrição dos seus serviços..."
                defaultValue="Prestação de serviços de beleza e bem-estar com profissionais qualificados."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input id="phone" placeholder="(11) 99999-9999" defaultValue="(11) 99999-9999" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input id="email" type="email" placeholder="contato@salao.com" defaultValue="contato@salao.com" className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" placeholder="Rua, número" defaultValue="Rua das Flores, 123" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Centro" defaultValue="Centro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="São Paulo" defaultValue="São Paulo" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" placeholder="SP" defaultValue="SP" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" placeholder="00000-000" defaultValue="01234-567" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horário de Funcionamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horário de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { day: "Segunda-feira", start: "08:00", end: "18:00", active: true },
              { day: "Terça-feira", start: "08:00", end: "18:00", active: true },
              { day: "Quarta-feira", start: "08:00", end: "18:00", active: true },
              { day: "Quinta-feira", start: "08:00", end: "18:00", active: true },
              { day: "Sexta-feira", start: "08:00", end: "18:00", active: true },
              { day: "Sábado", start: "08:00", end: "16:00", active: true },
              { day: "Domingo", start: "", end: "", active: false },
            ].map((schedule, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium">
                  {schedule.day.slice(0, 3)}
                </div>
                <Switch checked={schedule.active} />
                {schedule.active && (
                  <>
                    <Input 
                      type="time" 
                      defaultValue={schedule.start}
                      className="w-24"
                    />
                    <span className="text-muted-foreground">às</span>
                    <Input 
                      type="time" 
                      defaultValue={schedule.end}
                      className="w-24"
                    />
                  </>
                )}
                {!schedule.active && (
                  <span className="text-muted-foreground text-sm">Fechado</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">Receber emails sobre novos agendamentos</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                <p className="text-sm text-muted-foreground">Receber SMS sobre confirmações</p>
              </div>
              <Switch id="sms-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reminders">Lembretes Automáticos</Label>
                <p className="text-sm text-muted-foreground">Enviar lembretes para clientes</p>
              </div>
              <Switch id="reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfiguracoesSalon;