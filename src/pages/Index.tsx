
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const services = [
  {
    id: 1,
    title: "Corte de Cabelo",
    description: "Cortes modernos para todos os estilos, com profissionais especializados em valorizar seu tipo de cabelo.",
    price: "A partir de R$50",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Manicure",
    description: "Unhas perfeitas com os melhores produtos e técnicas, desde o básico até nail arts elaboradas.",
    price: "A partir de R$35",
    image: "https://images.unsplash.com/photo-1607979036079-64fce335adaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Tratamento Facial",
    description: "Rejuvenesça sua pele com tratamentos especializados que combinam tecnologia e produtos naturais.",
    price: "A partir de R$80",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// Featured salons for the marketplace
const featuredSalons = [
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
    logo_url: "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?w=500"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <HeroSection />
      
      <main>
        {/* Welcome Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-purple-800 uppercase tracking-wider text-sm font-medium mb-4 inline-block">Bem-vindo ao Beleza Vivo</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">O maior marketplace de beleza do Brasil</h2>
            <div className="w-24 h-0.5 bg-purple-800 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Conectamos você aos melhores profissionais e salões de beleza da sua região.
              Compare serviços, preços, horários disponíveis e avaliações para encontrar o salão perfeito 
              e agende seu horário com apenas alguns cliques.
            </p>
            <Button asChild variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors rounded-none">
              <Link to="/salons" className="flex items-center gap-2">
                Encontrar salões próximos
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Featured Salons Section */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-purple-800 uppercase tracking-wider text-sm font-medium mb-4 inline-block">Salões em destaque</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Salões mais bem avaliados</h2>
              <div className="w-24 h-0.5 bg-purple-800 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSalons.map((salon) => (
                <div key={salon.id} className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={salon.logo_url} 
                      alt={salon.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-white px-3 py-1 m-2 rounded-full flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">{salon.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{salon.name}</h3>
                    <p className="text-gray-600 mb-3">{salon.description}</p>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{salon.district}, {salon.city}</span>
                    </div>
                    <Button asChild className="w-full bg-purple-800 hover:bg-purple-900">
                      <Link to={`/salons/${salon.id}`}>Ver detalhes</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button asChild variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors rounded-none">
                <Link to="/salons" className="flex items-center gap-2">
                  Ver todos os salões
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-purple-800 uppercase tracking-wider text-sm font-medium mb-4 inline-block">Nossos serviços</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Serviços mais procurados</h2>
              <div className="w-24 h-0.5 bg-purple-800 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="mt-16 text-center">
              <Button asChild variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors rounded-none">
                <Link to="/services" className="flex items-center gap-2">
                  Ver todos os serviços
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-6xl mx-auto text-center">
            <span className="text-purple-800 uppercase tracking-wider text-sm font-medium mb-4 inline-block">Como funciona</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Simples e rápido</h2>
            <div className="w-24 h-0.5 bg-purple-800 mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center mb-6 text-white text-xl font-bold">1</div>
                <h3 className="text-xl font-serif mb-3">Encontre um salão</h3>
                <p className="text-gray-600">Busque por localização, serviço ou nome do salão para encontrar opções que atendam às suas necessidades</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center mb-6 text-white text-xl font-bold">2</div>
                <h3 className="text-xl font-serif mb-3">Escolha o serviço</h3>
                <p className="text-gray-600">Compare preços, avaliações e disponibilidade de diferentes profissionais e serviços</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center mb-6 text-white text-xl font-bold">3</div>
                <h3 className="text-xl font-serif mb-3">Agende online</h3>
                <p className="text-gray-600">Escolha o melhor horário para você e confirme seu agendamento em poucos cliques</p>
              </div>
            </div>
            
            <div className="mt-14">
              <Button asChild size="lg" className="bg-purple-800 hover:bg-purple-900 rounded-none px-8">
                <Link to="/salons" className="flex items-center gap-2">
                  Começar agora
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
