
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Beleza e Bem-Estar ao seu Alcance
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Agende seu horário online e desfrute dos melhores serviços de beleza com profissionais qualificados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link to="/booking">Agendar agora</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/services">Ver serviços</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
