
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const allServices = [
  {
    id: 1,
    title: "Corte de Cabelo",
    description: "Cortes modernos para todos os estilos",
    price: "A partir de R$50",
    image: "/placeholder.svg",
    category: "cabelo"
  },
  {
    id: 2,
    title: "Manicure",
    description: "Unhas perfeitas com os melhores produtos",
    price: "A partir de R$35",
    image: "/placeholder.svg",
    category: "unhas"
  },
  {
    id: 3,
    title: "Tratamento Facial",
    description: "Rejuvenesça sua pele com tratamentos especializados",
    price: "A partir de R$80",
    image: "/placeholder.svg",
    category: "rosto"
  },
  {
    id: 4,
    title: "Coloração",
    description: "Novas cores para um novo visual",
    price: "A partir de R$120",
    image: "/placeholder.svg",
    category: "cabelo"
  },
  {
    id: 5,
    title: "Massagem Relaxante",
    description: "Alivia tensão e promove bem-estar",
    price: "A partir de R$150",
    image: "/placeholder.svg",
    category: "corpo"
  },
  {
    id: 6,
    title: "Depilação",
    description: "Técnicas modernas para pele macia",
    price: "A partir de R$40",
    image: "/placeholder.svg",
    category: "corpo"
  },
];

const categories = [
  { id: "all", name: "Todos" },
  { id: "cabelo", name: "Cabelo" },
  { id: "unhas", name: "Unhas" },
  { id: "rosto", name: "Rosto" },
  { id: "corpo", name: "Corpo" },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || service.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-xl text-muted-foreground">
              Explore nossa variedade de serviços de beleza
            </p>
          </div>
          
          <div className="mb-8">
            <Input
              type="search"
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
          
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <p>Nenhum serviço encontrado. Tente outra busca.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
