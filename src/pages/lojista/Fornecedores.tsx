import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Package, Building2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  company_id: string;
}

interface Company {
  id: string;
  name: string;
  email: string;
}

interface ProductWithCompany extends Product {
  company: Company;
}

const LojistaFornecedores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const CATEGORIES = [
    { value: 'beleza', label: 'Beleza' },
    { value: 'cabelo', label: 'Cabelo' },
    { value: 'unha', label: 'Unha' },
    { value: 'estetica', label: 'Estética' },
    { value: 'maquiagem', label: 'Maquiagem' },
    { value: 'equipamentos', label: 'Equipamentos' },
    { value: 'mobiliario', label: 'Mobiliário' },
    { value: 'outros', label: 'Outros' },
  ];

  // Fetch products and companies
  const { data: productsWithCompanies = [], isLoading } = useQuery({
    queryKey: ['supplier-products'],
    queryFn: async () => {
      // First get active products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Get unique company IDs
      const companyIds = [...new Set(products.map(p => p.company_id))];

      // Get companies with B2B supplier profile
      const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select(`
          id, 
          name, 
          email,
          company_profiles!inner(business_type)
        `)
        .in('id', companyIds)
        .eq('company_profiles.business_type', 'b2b_supplier')
        .eq('company_profiles.is_active', true);

      if (companiesError) throw companiesError;

      // Combine products with their companies
      const result: ProductWithCompany[] = products
        .filter(product => companies.some(company => company.id === product.company_id))
        .map(product => {
          const company = companies.find(c => c.id === product.company_id);
          return {
            ...product,
            company: {
              id: company!.id,
              name: company!.name,
              email: company!.email,
            }
          };
        });

      return result;
    },
  });

  const filteredProducts = useMemo(() => {
    return productsWithCompanies.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
                           product.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [productsWithCompanies, searchTerm, categoryFilter]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fornecedores</h1>
        <p className="text-muted-foreground">Explore produtos de fornecedores B2B para sua loja</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos ou fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p>Carregando produtos...</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground text-center">
              {productsWithCompanies.length === 0 
                ? 'Ainda não há produtos disponíveis de fornecedores.'
                : 'Tente ajustar os filtros de busca.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">
                        {CATEGORIES.find(c => c.value === product.category)?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      por {product.company.name}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {product.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LojistaFornecedores;