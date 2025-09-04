import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, MapPin, Calendar, ChevronLeft, ChevronRight, ShoppingBag, Users, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import marketplaceCraftsImage from "@/assets/marketplace-crafts.jpg";
import b2bConnectionImage from "@/assets/b2b-connection.jpg";
const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Serviços de Beleza",
      title: "Conectando você aos melhores profissionais de beleza",
      subtitle: "Compare serviços, preços e avaliações de diversos salões e agende seu horário online com facilidade",
      icon: Sparkles,
      searchPlaceholder: "Serviço ou salão",
      buttonText: "Buscar Serviços",
      route: "/servicos"
    },
    {
      id: 2,
      image: marketplaceCraftsImage,
      category: "Marketplace Local",
      title: "Descubra produtos únicos e artesanato local",
      subtitle: "Encontre joias, artesanato, cosméticos e produtos locais com Mumbuca aceita. Apoie o comércio de Maricá",
      icon: ShoppingBag,
      searchPlaceholder: "Produto ou artesão",
      buttonText: "Buscar Produtos",
      route: "/marketplace"
    },
    {
      id: 3,
      image: b2bConnectionImage,
      category: "Conexão B2B",
      title: "Conecte sua empresa com fornecedores locais",
      subtitle: "Plataforma completa para lojistas e fornecedores. Gerencie pedidos, catálogos e parcerias comerciais",
      icon: Users,
      searchPlaceholder: "Empresa ou fornecedor",
      buttonText: "Buscar Parceiros",
      route: "/b2b"
    }
  ];

  const currentSlide = heroSlides[current];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play functionality
    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [api]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);
    
    // Route based on current slide
    const baseRoute = currentSlide.route === "/servicos" ? "/salons" : currentSlide.route;
    navigate(`${baseRoute}?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Carousel setApi={setApi} className="w-full h-full absolute inset-0" opts={{ loop: true }}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative min-h-[90vh] flex items-center">
                {/* Background image with overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundPosition: "center"
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                {/* Content overlay */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
                  <div className="max-w-2xl text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <slide.icon className="w-6 h-6" />
                      <span className="text-lg font-light uppercase tracking-wider">
                        {slide.category}
                      </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-serif font-light mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-10 font-light opacity-90 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8 border border-white/20">
                      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="text" 
                            placeholder={slide.searchPlaceholder}
                            className="pl-10 bg-white/80 border-0 text-gray-900 h-12" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                          />
                        </div>
                        <div className="relative flex-1">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="text" 
                            placeholder="Localização" 
                            className="pl-10 bg-white/80 border-0 text-gray-900 h-12" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                          />
                        </div>
                        <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8">
                          {slide.buttonText}
                        </Button>
                      </form>
                    </div>
                    
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Controls */}
        <CarouselPrevious className="left-6 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-6 bg-white/20 border-white/30 text-white hover:bg-white/30" />
      </Carousel>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
export default HeroSection;