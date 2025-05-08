
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SalonProps {
  salon: {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    district?: string;
    rating?: number;
    logo_url?: string;
  };
}

const SalonCard: React.FC<SalonProps> = ({ salon }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ 
          backgroundImage: salon.logo_url 
            ? `url(${salon.logo_url})` 
            : "url('https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80')"
        }}
      />
      <CardHeader className="pb-2">
        <CardTitle>{salon.name}</CardTitle>
        <CardDescription>
          {salon.city}{salon.district ? `, ${salon.district}` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon 
              key={star} 
              className={`w-4 h-4 ${star <= (salon.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{salon.rating?.toFixed(1) || "Sem avaliações"}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {salon.description || "Este salão ainda não possui uma descrição."}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/salons/${salon.id}`}>Ver detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalonCard;
