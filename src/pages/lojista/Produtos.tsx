import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone XYZ",
    category: "Eletrônicos",
    price: "R$ 899,00",
    stock: 15,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Tênis Esportivo",
    category: "Roupas",
    price: "R$ 199,00",
    stock: 3,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Livro Técnico",
    category: "Livros",
    price: "R$ 89,00",
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg"
  }
];

const LojistaProdutos = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Produtos</h2>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de produtos.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Produto
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar produtos..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-4">
        {mockProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-lg font-bold text-primary">{product.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Estoque</p>
                    <p className={`font-medium ${product.stock === 0 ? 'text-red-500' : product.stock < 5 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {product.stock} unidades
                    </p>
                  </div>
                  
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LojistaProdutos;