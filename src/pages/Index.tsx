
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
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Seu refúgio de beleza e bem-estar</h2>
            <div className="w-24 h-0.5 bg-purple-800 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Oferecemos uma experiência única de beleza, combinando técnicas modernas e produtos de alta qualidade para 
              proporcionar resultados excepcionais. Nossa equipe de profissionais qualificados está pronta para cuidar de você.
            </p>
            <Button asChild variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors rounded-none">
              <Link to="/services" className="flex items-center gap-2">
                Conheça nossos serviços
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-purple-800 uppercase tracking-wider text-sm font-medium mb-4 inline-block">Nossos serviços</span>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Tratamentos em destaque</h2>
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
        
        {/* Why Choose Us */}
        <section className="py-20 px-6 bg-cover bg-center relative" style={{ backgroundImage: "url('https://spalabele.wpengine.com/wp-content/uploads/2023/07/spacious-spa-interior.jpg')" }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="uppercase tracking-wider text-sm font-medium mb-4 inline-block">Nossa Diferença</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">Por que nos escolher?</h2>
            <div className="w-24 h-0.5 bg-white mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Profissionais Qualificados</h3>
                <p className="text-white/80">Nossa equipe é formada por especialistas com anos de experiência</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Produtos Premium</h3>
                <p className="text-white/80">Utilizamos apenas produtos de alta qualidade para os melhores resultados</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-3">Ambiente Acolhedor</h3>
                <p className="text-white/80">Um espaço pensado para proporcionar conforto e relaxamento</p>
              </div>
            </div>
            
            <div className="mt-14">
              <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100 rounded-none px-8">
                <Link to="/booking" className="flex items-center gap-2">
                  Agende agora
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
