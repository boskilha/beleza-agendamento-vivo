
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserLocation } from "@/store/slices/locationSlice";
import { useToast } from "@/hooks/use-toast";

const GeoLocationButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Erro",
        description: "Geolocalização não é suportada pelo seu navegador",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
        toast({
          title: "Localização obtida",
          description: "Agora você pode ver produtos próximos a você",
        });
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Erro ao obter localização",
          description: "Não foi possível acessar sua localização",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <Button
      onClick={handleGetLocation}
      variant="outline"
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <MapPin className="w-4 h-4" />
      )}
      {isLoading ? "Obtendo localização..." : "Usar minha localização"}
    </Button>
  );
};

export default GeoLocationButton;
