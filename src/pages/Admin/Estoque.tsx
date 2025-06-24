
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PencilLine, Trash2, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProdutoEstoque {
  id: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
  categoria: string;
  alerta: number;
}

const produtosIniciais: ProdutoEstoque[] = [
  { id: 1, nome: "Shampoo Profissional 500ml", quantidade: 15, valorUnitario: 45.90, categoria: "Cabelo", alerta: 5 },
  { id: 2, nome: "Condicionador Profissional 500ml", quantidade: 12, valorUnitario: 49.90, categoria: "Cabelo", alerta: 5 },
  { id: 3, nome: "Tinta para Cabelo - Preto", quantidade: 8, valorUnitario: 29.90, categoria: "Coloração", alerta: 5 },
  { id: 4, nome: "Esmalte Vermelho", quantidade: 3, valorUnitario: 12.50, categoria: "Unhas", alerta: 5 },
  { id: 5, nome: "Máscara Hidratante 300g", quantidade: 6, valorUnitario: 69.90, categoria: "Tratamento", alerta: 3 },
];

const Estoque = () => {
  const [produtos, setProdutos] = useState<ProdutoEstoque[]>(produtosIniciais);

  const handleDelete = (id: number) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  const getProdutosComBaixoEstoque = () => {
    return produtos.filter(produto => produto.quantidade <= produto.alerta);
  };

  const produtosBaixoEstoque = getProdutosComBaixoEstoque();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground">Gerencie o estoque de produtos do seu salão</p>
        </div>
        <Button className="bg-purple-800 hover:bg-purple-900">
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      {produtosBaixoEstoque.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Produtos com Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {produtosBaixoEstoque.map(produto => (
                <li key={produto.id} className="text-red-700">
                  <span className="font-medium">{produto.nome}</span> - Apenas {produto.quantidade} unidades em estoque
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg">
        <CardHeader className="bg-purple-700 rounded-t-xl">
          <CardTitle className="text-white">Produtos em Estoque</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-100">
                <TableHead className="text-purple-800">Nome</TableHead>
                <TableHead className="text-purple-800">Categoria</TableHead>
                <TableHead className="text-purple-800">Quantidade</TableHead>
                <TableHead className="text-purple-800">Valor Unitário</TableHead>
                <TableHead className="text-purple-800">Valor Total</TableHead>
                <TableHead className="text-purple-800 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto, i) => (
                <TableRow
                  key={produto.id}
                  className={`${i % 2 === 0 ? "bg-purple-50" : "bg-white"} ${produto.quantidade <= produto.alerta ? "border-l-4 border-red-500" : ""}`}
                >
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className={produto.quantidade <= produto.alerta ? "text-red-600 font-medium" : ""}>
                    {produto.quantidade}
                  </TableCell>
                  <TableCell>R$ {produto.valorUnitario.toFixed(2)}</TableCell>
                  <TableCell>R$ {(produto.quantidade * produto.valorUnitario).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(produto.id)}
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
            Total de {produtos.length} produtos em estoque
          </div>
          <div className="text-sm font-medium">
            Valor total: R$ {produtos.reduce((acc, produto) => acc + (produto.quantidade * produto.valorUnitario), 0).toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Estoque;
