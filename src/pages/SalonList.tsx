import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalonCard from "@/components/SalonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumbs from "@/components/SEO/Breadcrumbs";

interface Salon {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  district?: string;
  rating?: number;
  logo_url?: string;
}

const SalonList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");
  
  // SEO Configuration
  useSEO({
    title: "Salões de Beleza em Maricá e São Paulo | Agendamento Online | Ello",
    description: "Encontre os melhores salões de beleza em Maricá e São Paulo. Compare preços, avaliações e agende online. Corte, coloração, manicure e muito mais.",
    keywords: "salões beleza maricá, salões são paulo, agendamento online, corte cabelo, manicure, coloração, tratamento facial",
    url: "https://ello-marketplace.com/salons",
    canonical: "https://ello-marketplace.com/salons"
  });
  
  useEffect(() => {
    const fetchSalons = async () => {
      setLoading(true);
      
      try {
        // Using type assertion to work around TypeScript constraints
        const supabaseAny = supabase as any;
        let query = supabaseAny.from('salons').select('*');
        
        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }
        
        if (locationFilter) {
          query = query.or(`city.ilike.%${locationFilter}%,district.ilike.%${locationFilter}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching salons:", error);
          return;
        }
        
        setSalons(data as Salon[] || []);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalons();
  }, [searchTerm, locationFilter]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm, location: locationFilter });
  };
  
  // Temporary mock data until we have real salons in the database
  const mockSalons: Salon[] = [
    {
      id: "1",
      name: "Estúdio Beauty Arte",
      description: "Especialistas em coloração e cortes modernos",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      district: "Jardins",
      rating: 4.8,
      logo_url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=500"
    },
    {
      id: "2",
      name: "Espaço Glamour",
      description: "Tratamentos capilares e estéticos exclusivos",
      address: "Av. Paulista, 1500",
      city: "São Paulo",
      district: "Bela Vista",
      rating: 4.5,
      logo_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500"
    },
    {
      id: "3",
      name: "Salão Premium",
      description: "Ambiente sofisticado com serviços de primeira linha",
      address: "Rua Oscar Freire, 250",
      city: "São Paulo",
      district: "Pinheiros",
      rating: 4.9,
      logo_url: "https://i0.wp.com/novodianoticias.com.br/wp-content/uploads/2021/10/Prime-Pro-Beauty-Jundiai-ganha-novo-conceito-de-salao-de-beleza-1.png"
    },
  ];
  
  const displaySalons = salons.length > 0 ? salons : mockSalons;
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs className="mb-6" />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Salões de Beleza em Maricá e São Paulo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra os melhores salões de beleza próximos a você e agende seu horário
            </p>
          </div>
          
          <div className="mb-10">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nome do salão ou serviço"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Filtrar por localização (cidade, bairro)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-purple-800 hover:bg-purple-900">
                Buscar
              </Button>
            </form>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">{displaySalons.length} salões encontrados</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Avaliação
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-[350px] animate-pulse bg-gray-100" />
              ))}
            </div>
          ) : (
            displaySalons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displaySalons.map((salon) => (
                  <SalonCard key={salon.id} salon={salon} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Nenhum salão encontrado</h3>
                <p className="text-gray-600 mb-4">
                  Tente ajustar seus filtros ou termos de busca
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("");
                    setSearchParams({});
                  }}
                  variant="outline"
                >
                  Limpar filtros
                </Button>
              </div>
            )
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SalonList;
