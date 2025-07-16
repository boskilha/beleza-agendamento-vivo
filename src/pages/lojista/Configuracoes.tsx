import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, Store, Bell, Shield } from "lucide-react";

const LojistaConfiguracoes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h2>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua loja e perfil.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Informações da Loja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input id="store-name" placeholder="Digite o nome da sua loja" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="store-description">Descrição</Label>
              <Textarea id="store-description" placeholder="Descreva sua loja" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="store-phone">Telefone</Label>
              <Input id="store-phone" placeholder="(11) 99999-9999" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Novos Pedidos</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações quando houver novos pedidos
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Estoque Baixo</Label>
                <p className="text-sm text-muted-foreground">
                  Alertas quando produtos estiverem com estoque baixo
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">
                  Receber resumo semanal de vendas por email
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button variant="outline">Alterar Senha</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LojistaConfiguracoes;