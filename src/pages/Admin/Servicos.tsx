
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PencilLine, Trash2, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Servico {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
  descricao: string;
}

const servicosIniciais: Servico[] = [
  { id: 1, nome: "Corte Feminino", preco: 80, duracao: 60, descricao: "Corte e finalização para cabelos femininos" },
  { id: 2, nome: "Corte Masculino", preco: 50, duracao: 30, descricao: "Corte simples para cabelos masculinos" },
  { id: 3, nome: "Manicure", preco: 35, duracao: 40, descricao: "Tratamento completo para unhas das mãos" },
  { id: 4, nome: "Pedicure", preco: 45, duracao: 50, descricao: "Tratamento completo para unhas dos pés" },
];

const Servicos = () => {
  const [servicos, setServicos] = useState<Servico[]>(servicosIniciais);
  const isPlanFree = true; // Simulando o plano free
  const maxServicos = 5; // Limite para o plano free

  const handleDelete = (id: number) => {
    setServicos(servicos.filter(servico => servico.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
          <p className="text-muted-foreground">Gerencie os serviços oferecidos pelo seu salão</p>
        </div>
        <Button 
          className="bg-purple-800 hover:bg-purple-900"
          disabled={isPlanFree && servicos.length >= maxServicos}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Serviço
        </Button>
      </div>

      {isPlanFree && servicos.length >= maxServicos && (
        <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-yellow-800">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p>Você atingiu o limite de 5 serviços do plano Free. <a href="/admin/upgrade" className="font-medium underline">Faça upgrade</a> para adicionar mais serviços.</p>
        </div>
      )}

      <Card className="shadow-lg">
        <CardHeader className="bg-purple-700 rounded-t-xl">
          <CardTitle className="text-white">Serviços Disponíveis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100">
                <TableHead className="text-purple-800">Nome</TableHead>
                <TableHead className="text-purple-800">Preço</TableHead>
                <TableHead className="text-purple-800">Duração (min)</TableHead>
                <TableHead className="text-purple-800">Descrição</TableHead>
                <TableHead className="text-purple-800 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicos.map((servico, i) => (
                <TableRow
                  key={servico.id}
                  className={i % 2 === 0 ? "bg-purple-50" : "bg-white"}
                >
                  <TableCell className="font-medium">{servico.nome}</TableCell>
                  <TableCell>R$ {servico.preco.toFixed(2)}</TableCell>
                  <TableCell>{servico.duracao}</TableCell>
                  <TableCell className="max-w-xs truncate">{servico.descricao}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(servico.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {isPlanFree ? `${servicos.length} de ${maxServicos} serviços (Plano Free)` : `${servicos.length} serviços cadastrados`}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Servicos;
