
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Configuracoes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do seu salão</p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="mb-4">
          <TabsTrigger value="perfil">Perfil do Salão</TabsTrigger>
          <TabsTrigger value="planos">Planos e Assinatura</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Salão</CardTitle>
              <CardDescription>Atualize as informações do seu estabelecimento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 py-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome-salao">Nome do Salão</Label>
                  <Input id="nome-salao" defaultValue="Ello" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 3456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="contato@ello.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" defaultValue="Av. Paulista, 1000 - São Paulo/SP" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <textarea
                    id="descricao"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Ello é um salão especializado em cortes, tratamentos capilares e serviços de estética, oferecendo atendimento personalizado com profissionais qualificados."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logo">Logo do Salão</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md bg-purple-800 flex items-center justify-center text-white font-serif text-xl">
                      E
                    </div>
                    <Button variant="outline">Alterar Logo</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-800 hover:bg-purple-900">Salvar Alterações</Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>Configure os horários de atendimento do seu salão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch id={`day-${index}`} defaultChecked={index < 6} />
                      <Label htmlFor={`day-${index}`}>{day}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        className="w-28"
                        defaultValue={index < 6 ? "09:00" : ""}
                        disabled={index === 6}
                      />
                      <span className="text-muted-foreground">às</span>
                      <Input
                        type="time"
                        className="w-28"
                        defaultValue={index < 5 ? "19:00" : index === 5 ? "16:00" : ""}
                        disabled={index === 6}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-800 hover:bg-purple-900">Salvar Horários</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="planos">
          <Card>
            <CardHeader>
              <CardTitle>Seu Plano Atual</CardTitle>
              <CardDescription>Gerencie seu plano de assinatura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Plano Free</h3>
                    <p className="text-sm text-muted-foreground">Plano básico com recursos limitados</p>
                  </div>
                  <div className="text-2xl font-bold">Grátis</div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Recursos incluídos:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Até 5 serviços
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Gerenciamento de agendamentos básico
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      3 funcionários
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <span className="line-through">Relatórios avançados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <span className="line-through">Site personalizado</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="font-medium mb-4">Planos Disponíveis</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 hover:border-purple-800 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Standard</h4>
                    <div className="text-lg font-bold">R$ 49,90<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Ideal para salões em crescimento</p>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Serviços ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      10 funcionários
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Relatórios avançados
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-800 hover:bg-purple-900">Fazer Upgrade</Button>
                </div>

                <div className="rounded-lg border border-purple-800 p-4 shadow-sm relative">
                  <div className="absolute -top-3 right-4 bg-purple-800 text-white text-xs px-2 py-1 rounded">Recomendado</div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Premium</h4>
                    <div className="text-lg font-bold">R$ 99,90<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Solução completa para seu negócio</p>
                  <ul className="space-y-1 text-sm mb-4">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Tudo do plano Standard
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Funcionários ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Site personalizado
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Suporte prioritário
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-800 hover:bg-purple-900">Fazer Upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure como deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Novos Agendamentos</h3>
                    <p className="text-sm text-muted-foreground">Receba notificações quando houver novos agendamentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cancelamentos</h3>
                    <p className="text-sm text-muted-foreground">Receba notificações quando um cliente cancelar um agendamento</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Lembretes</h3>
                    <p className="text-sm text-muted-foreground">Receba lembretes dos agendamentos do dia</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Alertas de Estoque</h3>
                    <p className="text-sm text-muted-foreground">Receba notificações quando produtos estiverem com estoque baixo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mensagens do Chat</h3>
                    <p className="text-sm text-muted-foreground">Receba notificações de novas mensagens de clientes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Canais de Notificação</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch id="email-notif" defaultChecked />
                      <Label htmlFor="email-notif">Email</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="app-notif" defaultChecked />
                      <Label htmlFor="app-notif">No aplicativo</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="sms-notif" />
                      <Label htmlFor="sms-notif">SMS (Premium)</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-purple-800 hover:bg-purple-900">Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;
