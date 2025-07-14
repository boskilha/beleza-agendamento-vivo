
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/marketplace/ProductCard";
import GeoLocationButton from "@/components/shared/GeoLocationButton";

// Mock data - Em produção viria de uma API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Colar Artesanal de Prata",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
    category: "Joias",
    seller: "Atelier Maria",
    rating: 4.8,
    distance: 2.3,
    description: "Colar artesanal feito à mão com prata 925 e pedras naturais de Maricá",
    stock: 5
  },
  {
    id: "2",
    name: "Vestido Boho Chic",
    price: 159.90,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
    category: "Moda",
    seller: "Boutique Maricá",
    rating: 4.5,
    distance: 1.8,
    description: "Vestido estilo boho chic perfeito para o verão, tecido linho natural",
    stock: 3
  },
  {
    id: "3",
    name: "Sabonete Natural Lavanda",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1556228578-dd6b7b2c7d34?w=500",
    category: "Cosméticos",
    seller: "Natureza Viva",
    rating: 4.9,
    distance: 0.9,
    description: "Sabonete artesanal com óleo essencial de lavanda, ideal para pele sensível",
    stock: 15
  }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { items } = useSelector((state: RootState) => state.cart);
  
  const categories = ["Todos", "Joias", "Moda", "Cosméticos", "Artesanato"];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-light mb-4">
                Marketplace Local de Maricá
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Descubra produtos únicos feitos por artesãos e lojistas locais
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <GeoLocationButton />
              <Button asChild variant="outline" className="relative">
                <Link to="/carrinho" className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Carrinho
                  {items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-800">
                      {items.length}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Filters and Categories */}
        <section className="py-6 px-6 bg-white border-t">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-800 hover:bg-purple-900" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-light">
                {filteredProducts.length} produtos encontrados
              </h2>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Nenhum produto encontrado para sua busca.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todos");
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
