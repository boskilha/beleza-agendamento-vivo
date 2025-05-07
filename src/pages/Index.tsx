
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const services = [
  {
    id: 1,
    title: "Corte de Cabelo",
    description: "Cortes modernos para todos os estilos",
    price: "A partir de R$50",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Manicure",
    description: "Unhas perfeitas com os melhores produtos",
    price: "A partir de R$35",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Tratamento Facial",
    description: "Rejuvenesça sua pele com tratamentos especializados",
    price: "A partir de R$80",
    image: "/placeholder.svg"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      
      <main className="flex-1">
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link to="/services" className="flex items-center gap-2">
                  Ver todos os serviços
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Por que nos escolher?</h2>
            <p className="text-lg mb-12">
              Profissionais experientes, produtos de alta qualidade e ambiente acolhedor.
              Garantimos sua satisfação em cada visita.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/booking" className="flex items-center gap-2">
                Agendar agora
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
