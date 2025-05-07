
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 group">
      <div className="aspect-[3/2] w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="pt-6">
        <CardTitle className="font-serif text-2xl font-light">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
        <p className="font-medium text-lg mt-4 text-purple-800">{service.price}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white transition-colors duration-300 rounded-none">
          <Link to={`/booking?service=${service.id}`} className="flex items-center justify-center gap-2">
            Agendar serviço
            <ArrowRight size={18} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
