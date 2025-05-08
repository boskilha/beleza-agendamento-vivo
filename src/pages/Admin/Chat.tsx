
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: "client" | "salon";
  content: string;
  timestamp: string;
}

interface ChatClient {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  avatar: string;
  messages: Message[];
}

const initialClients: ChatClient[] = [
  {
    id: 1,
    name: "Maria Silva",
    lastMessage: "Posso reagendar para quinta?",
    unread: 2,
    avatar: "MS",
    messages: [
      { id: 1, sender: "client", content: "Olá, gostaria de saber se tem horário para quinta-feira?", timestamp: "10:23" },
      { id: 2, sender: "salon", content: "Olá Maria! Temos disponibilidade para 14h ou 16h na quinta. Qual prefere?", timestamp: "10:25" },
      { id: 3, sender: "client", content: "Prefiro às 16h, por favor.", timestamp: "10:28" },
      { id: 4, sender: "salon", content: "Perfeito! Agendado para quinta às 16h. Aguardamos você!", timestamp: "10:30" },
      { id: 5, sender: "client", content: "Obrigada! Na verdade, surgiu um imprevisto. Posso reagendar para outra data?", timestamp: "13:45" },
      { id: 6, sender: "client", content: "Posso reagendar para quinta da próxima semana?", timestamp: "13:46" }
    ]
  },
  {
    id: 2,
    name: "João Pereira",
    lastMessage: "Obrigado pelo atendimento!",
    unread: 0,
    avatar: "JP",
    messages: [
      { id: 1, sender: "client", content: "Queria agradecer pelo corte de ontem, ficou ótimo!", timestamp: "09:15" },
      { id: 2, sender: "salon", content: "Obrigado João! Ficamos felizes que tenha gostado. Sempre às ordens!", timestamp: "09:20" },
      { id: 3, sender: "client", content: "Obrigado pelo atendimento!", timestamp: "09:22" }
    ]
  },
  {
    id: 3,
    name: "Ana Santos",
    lastMessage: "Que horas vocês fecham hoje?",
    unread: 1,
    avatar: "AS",
    messages: [
      { id: 1, sender: "client", content: "Que horas vocês fecham hoje?", timestamp: "11:05" }
    ]
  }
];

const Chat = () => {
  const [clients, setClients] = useState<ChatClient[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<ChatClient | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSelectClient = (client: ChatClient) => {
    // Mark messages as read
    const updatedClients = clients.map(c => {
      if (c.id === client.id) {
        return { ...c, unread: 0 };
      }
      return c;
    });
    
    setClients(updatedClients);
    setSelectedClient(client);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedClient) return;

    const updatedMessage: Message = {
      id: Date.now(),
      sender: "salon",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          messages: [...client.messages, updatedMessage],
          lastMessage: newMessage
        };
      }
      return client;
    });

    setClients(updatedClients);
    setSelectedClient(prev => prev ? {
      ...prev,
      messages: [...prev.messages, updatedMessage],
      lastMessage: newMessage
    } : null);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat com Clientes</h1>
        <p className="text-muted-foreground">Comunique-se em tempo real com seus clientes</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clients.map(client => (
                <div
                  key={client.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-3 transition-colors ${
                    selectedClient?.id === client.id
                      ? "bg-purple-100"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-800 text-sm font-medium text-white">
                      {client.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground truncate w-40">{client.lastMessage}</p>
                    </div>
                  </div>
                  {client.unread > 0 && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-800 text-xs text-white">
                      {client.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle>
              {selectedClient ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-800 text-sm font-medium text-white">
                    {selectedClient.avatar}
                  </div>
                  <span>{selectedClient.name}</span>
                </div>
              ) : (
                "Selecione um cliente para iniciar a conversa"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            {selectedClient ? (
              <div className="flex flex-col gap-3">
                {selectedClient.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "salon" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "salon"
                          ? "bg-purple-800 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-right text-xs ${
                        message.sender === "salon" ? "text-purple-200" : "text-gray-500"
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Selecione uma conversa para começar
              </div>
            )}
          </CardContent>
          {selectedClient && (
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button 
                  className="bg-purple-800 hover:bg-purple-900"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;
