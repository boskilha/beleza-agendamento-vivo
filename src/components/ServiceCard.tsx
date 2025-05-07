
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
        <p className="font-medium text-lg mt-2">{service.price}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/booking?service=${service.id}`}>Agendar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
