import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, Edit, Trash2, Package, Upload, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Insumo {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  unit: string;
  createdAt: Date;
}

interface InsumoForm {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  unit: string;
  image?: File | null;
}

const FornecedorCatalogo = () => {
  const { toast } = useToast();
  const [insumos, setInsumos] = useState<Insumo[]>([
    {
      id: "1",
      name: "Óleo de Argan Premium",
      description: "Óleo de argan puro 100% natural para tratamentos capilares",
      price: 45.90,
      category: "óleos",
      image: undefined,
      stock: 50,
      unit: "ml",
      createdAt: new Date()
    },
    {
      id: "2", 
      name: "Shampoo Base Neutro",
      description: "Base neutra para criação de shampoos personalizados",
      price: 25.50,
      category: "bases",
      image: undefined,
      stock: 100,
      unit: "ml",
      createdAt: new Date()
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<InsumoForm>({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    unit: "ml",
    image: null
  });

  const categories = ["óleos", "bases", "essências", "conservantes", "emulsificantes", "ativos"];
  const units = ["ml", "g", "kg", "l", "unidade"];

  const handleInputChange = (field: keyof InsumoForm, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "image" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({ title: "Erro", description: "Nome do insumo é obrigatório", variant: "destructive" });
      return false;
    }
    if (!formData.description.trim()) {
      toast({ title: "Erro", description: "Descrição é obrigatória", variant: "destructive" });
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast({ title: "Erro", description: "Preço deve ser maior que zero", variant: "destructive" });
      return false;
    }
    if (!formData.category) {
      toast({ title: "Erro", description: "Categoria é obrigatória", variant: "destructive" });
      return false;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      toast({ title: "Erro", description: "Estoque deve ser um número válido", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newInsumo: Insumo = {
      id: editingInsumo?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      unit: formData.unit,
      image: imagePreview || undefined,
      createdAt: editingInsumo?.createdAt || new Date()
    };

    if (editingInsumo) {
      setInsumos(prev => prev.map(item => item.id === editingInsumo.id ? newInsumo : item));
      toast({ title: "Sucesso!", description: "Insumo atualizado com sucesso" });
    } else {
      setInsumos(prev => [...prev, newInsumo]);
      toast({ title: "Sucesso!", description: "Insumo cadastrado com sucesso" });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      unit: "ml",
      image: null
    });
    setImagePreview(null);
    setEditingInsumo(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (insumo: Insumo) => {
    setEditingInsumo(insumo);
    setFormData({
      name: insumo.name,
      description: insumo.description,
      price: insumo.price.toString(),
      category: insumo.category,
      stock: insumo.stock.toString(),
      unit: insumo.unit,
      image: null
    });
    setImagePreview(insumo.image || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setInsumos(prev => prev.filter(item => item.id !== id));
    toast({ title: "Sucesso!", description: "Insumo removido com sucesso" });
  };

  const filteredInsumos = insumos.filter(insumo => {
    const matchesSearch = insumo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insumo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || insumo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catálogo de Insumos</h2>
          <p className="text-muted-foreground">Gerencie seus insumos para produção</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-purple-800 hover:bg-purple-900">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Insumo
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingInsumo ? "Editar Insumo" : "Cadastrar Novo Insumo"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Insumo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Óleo de Argan Premium"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva o insumo, suas propriedades e usos"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Preço (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="stock">Estoque *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unidade</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Foto do Insumo</Label>
                <div className="mt-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleInputChange("image", file);
                    }}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                        <p className="text-sm text-gray-600">Clique para trocar a imagem</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Clique para fazer upload</p>
                          <p className="text-xs text-gray-500">PNG, JPG até 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-purple-800 hover:bg-purple-900">
                  {editingInsumo ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar insumos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Insumos */}
      {filteredInsumos.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== "all" ? "Nenhum insumo encontrado" : "Nenhum insumo cadastrado"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory !== "all" 
                  ? "Tente ajustar os filtros de busca" 
                  : "Comece cadastrando seu primeiro insumo"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsumos.map((insumo) => (
            <Card key={insumo.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {insumo.image ? (
                  <img 
                    src={insumo.image} 
                    alt={insumo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-1">{insumo.name}</CardTitle>
                  <Badge variant="secondary">
                    {insumo.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {insumo.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Preço:</span>
                    <span className="font-medium">R$ {insumo.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Estoque:</span>
                    <span className="font-medium">{insumo.stock} {insumo.unit}</span>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(insumo)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(insumo.id)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FornecedorCatalogo;