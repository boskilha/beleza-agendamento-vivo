
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PencilLine, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  servicosAtribuidos: number;
}

const funcionariosIniciais: Funcionario[] = [
  { id: 1, nome: "Ana Oliveira", cargo: "Cabeleireira", telefone: "(11) 98765-4321", email: "ana@belezavivo.com", servicosAtribuidos: 3 },
  { id: 2, nome: "Paulo Santos", cargo: "Barbeiro", telefone: "(11) 91234-5678", email: "paulo@belezavivo.com", servicosAtribuidos: 2 },
  { id: 3, nome: "Carla Silva", cargo: "Manicure", telefone: "(11) 99876-5432", email: "carla@belezavivo.com", servicosAtribuidos: 1 },
];

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(funcionariosIniciais);

  const handleDelete = (id: number) => {
    setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie sua equipe de profissionais</p>
        </div>
        <Button className="bg-purple-800 hover:bg-purple-900">
          <Plus className="mr-2 h-4 w-4" /> Novo Funcionário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipe de Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Serviços Atribuídos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cargo}</TableCell>
                  <TableCell>{funcionario.telefone}</TableCell>
                  <TableCell>{funcionario.email}</TableCell>
                  <TableCell>{funcionario.servicosAtribuidos}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(funcionario.id)}
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
      </Card>
    </div>
  );
};

export default Funcionarios;
