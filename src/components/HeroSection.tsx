
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Scissors, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl text-white">
          <span className="text-lg font-light uppercase tracking-wider mb-2 inline-block">Beleza & Bem-estar</span>
          <h1 className="text-5xl md:text-6xl font-serif font-light mb-6 leading-tight">
            Encontre o salão perfeito para sua beleza
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light opacity-90 leading-relaxed">
            Compare serviços, preços e avaliações dos melhores salões de beleza da sua região
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8 border border-white/20">
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Serviço ou salão" 
                  className="pl-10 bg-white/80 border-0 text-gray-900 h-12"
                />
              </div>
              <Button 
                asChild
                size="lg" 
                className="bg-purple-800 hover:bg-purple-900 rounded-none px-8 h-12"
              >
                <Link to="/salons">
                  Buscar salões
                </Link>
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100 rounded-none px-8">
              <Link to="/booking" className="flex items-center gap-2">
                <Calendar size={18} />
                Agendar agora
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none">
              <Link to="/services" className="flex items-center gap-2">
                <Scissors size={18} />
                Ver serviços
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
