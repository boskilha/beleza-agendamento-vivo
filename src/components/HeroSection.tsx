import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);
    navigate(`/salons?${params.toString()}`);
  };
  return <section className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
      backgroundPosition: "center"
    }}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl text-white">
          <span className="text-lg font-light uppercase tracking-wider mb-2 inline-block">Marketplace de Beleza</span>
          <h1 className="text-5xl md:text-6xl font-serif font-light mb-6 leading-tight">
            Conectando você aos melhores profissionais de beleza
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light opacity-90 leading-relaxed">
            Compare serviços, preços e avaliações de diversos salões e agende seu horário online com facilidade
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8 border border-white/20">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Serviço ou salão" className="pl-10 bg-white/80 border-0 text-gray-900 h-12" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Localização" className="pl-10 bg-white/80 border-0 text-gray-900 h-12" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <Button type="submit" size="lg" className="bg-purple-800 hover:bg-purple-900 rounded-none px-8 h-12">
                Buscar salões
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100 rounded-none px-8">
              
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none">
              
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;