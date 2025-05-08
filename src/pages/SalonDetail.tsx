import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, MapPin, Phone, Instagram, Clock, Calendar, ArrowRight } from "lucide-react";

interface Salon {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  rating?: number;
  logo_url?: string;
  instagram?: string;
  opening_hours?: any;
}

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category: string;
  image_url?: string;
}

interface Professional {
  id: string;
  name: string;
  position?: string;
  bio?: string;
  photo_url?: string;
}

const SalonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSalonData = async () => {
      setLoading(true);
      
      try {
        if (id) {
          // Use type assertion to work around TypeScript constraints
          const supabaseAny = supabase as any;
          
          // Fetch salon details
          const { data: salonData, error: salonError } = await supabaseAny
            .from('salons')
            .select('*')
            .eq('id', id)
            .single();
          
          if (salonError) {
            console.error("Error fetching salon:", salonError);
            return;
          }
          
          setSalon(salonData as Salon);
          
          // Fetch salon services
          const { data: servicesData, error: servicesError } = await supabaseAny
            .from('services')
            .select('*')
            .eq('salon_id', id);
          
          if (servicesError) {
            console.error("Error fetching services:", servicesError);
          } else {
            setServices(servicesData as Service[]);
          }
          
          // Fetch salon professionals
          const { data: professionalsData, error: professionalsError } = await supabaseAny
            .from('professionals')
            .select('*')
            .eq('salon_id', id);
          
          if (professionalsError) {
            console.error("Error fetching professionals:", professionalsError);
          } else {
            setProfessionals(professionalsData as Professional[]);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalonData();
  }, [id]);
  
  // Mock data for development until we have real data
  const mockSalon: Salon = {
    id: "1",
    name: "Estúdio Beauty Arte",
    description: "Especialistas em coloração e cortes modernos com mais de 10 anos de experiência. Nosso ambiente é aconchegante e todos os profissionais são certificados nas melhores técnicas do mercado.",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    district: "Jardins",
    phone: "(11) 98765-4321",
    rating: 4.8,
    logo_url: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800",
    instagram: "@estudiobeautyarte",
    opening_hours: {
      monday: "9:00 - 20:00",
      tuesday: "9:00 - 20:00",
      wednesday: "9:00 - 20:00",
      thursday: "9:00 - 20:00",
      friday: "9:00 - 20:00",
      saturday: "9:00 - 18:00",
      sunday: "Fechado"
    }
  };
  
  const mockServices: Service[] = [
    {
      id: "1",
      name: "Corte Feminino",
      description: "Corte e finalização para todos os tipos de cabelo",
      price: 80.00,
      duration: 60,
      category: "cabelo",
      image_url: "https://images.unsplash.com/photo-1560869713-7d0a29430cdb?w=500"
    },
    {
      id: "2",
      name: "Coloração",
      description: "Tintura profissional com produtos de alta qualidade",
      price: 150.00,
      duration: 120,
      category: "cabelo",
      image_url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500"
    },
    {
      id: "3",
      name: "Manicure",
      description: "Tratamento completo para unhas das mãos",
      price: 35.00,
      duration: 45,
      category: "unhas",
      image_url: "https://images.unsplash.com/photo-1604654894611-6973b376cbce?w=500"
    },
  ];
  
  const mockProfessionals: Professional[] = [
    {
      id: "1",
      name: "Ana Clara",
      position: "Cabeleireira",
      bio: "Especialista em cortes e coloração, com formação internacional",
      photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300"
    },
    {
      id: "2",
      name: "Roberto Sanchez",
      position: "Barbeiro",
      bio: "Especialista em barba e cabelo masculino",
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
    },
    {
      id: "3",
      name: "Juliana Mendes",
      position: "Manicure",
      bio: "Técnica especializada em unhas em gel e nail art",
      photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
    },
  ];
  
  const displaySalon = salon || mockSalon;
  const displayServices = services.length > 0 ? services : mockServices;
  const displayProfessionals = professionals.length > 0 ? professionals : mockProfessionals;
  
  // Group services by category
  const categories = [...new Set(displayServices.map(service => service.category))];
  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category] = displayServices.filter(service => service.category === category);
    return acc;
  }, {} as Record<string, Service[]>);
  
  const categoryNames: Record<string, string> = {
    "cabelo": "Cabelo",
    "unhas": "Unhas",
    "rosto": "Rosto",
    "corpo": "Corpo",
    "depilacao": "Depilação",
    "maquiagem": "Maquiagem"
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1 py-12 px-6">
          <div className="max-w-6xl mx-auto animate-pulse">
            <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1">
        <div 
          className="w-full h-64 md:h-80 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${displaySalon.logo_url || "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200"})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{displaySalon.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star} 
                      className={`w-5 h-5 ${star <= (displaySalon.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span>{displaySalon.rating?.toFixed(1) || "Sem avaliações"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="team">Equipe</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre o Salão</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <p className="text-gray-600">{displaySalon.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Informações de Contato</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                            <div>
                              <p>{displaySalon.address}</p>
                              <p>{displaySalon.city}{displaySalon.district ? `, ${displaySalon.district}` : ''}</p>
                            </div>
                          </div>
                          
                          {displaySalon.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-5 h-5 text-gray-500" />
                              <p>{displaySalon.phone}</p>
                            </div>
                          )}
                          
                          {displaySalon.instagram && (
                            <div className="flex items-center gap-2">
                              <Instagram className="w-5 h-5 text-gray-500" />
                              <p>{displaySalon.instagram}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {displaySalon.opening_hours && (
                        <div>
                          <h3 className="text-lg font-medium mb-3">Horário de Funcionamento</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Segunda-feira:</p>
                            </div>
                            <p>{displaySalon.opening_hours.monday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Terça-feira:</p>
                            </div>
                            <p>{displaySalon.opening_hours.tuesday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Quarta-feira:</p>
                            </div>
                            <p>{displaySalon.opening_hours.wednesday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Quinta-feira:</p>
                            </div>
                            <p>{displaySalon.opening_hours.thursday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Sexta-feira:</p>
                            </div>
                            <p>{displaySalon.opening_hours.friday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Sábado:</p>
                            </div>
                            <p>{displaySalon.opening_hours.saturday || "Fechado"}</p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-500" />
                              <p>Domingo:</p>
                            </div>
                            <p>{displaySalon.opening_hours.sunday || "Fechado"}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="services">
                  <Card>
                    <CardHeader>
                      <CardTitle>Serviços Oferecidos</CardTitle>
                      <CardDescription>
                        Escolha um de nossos serviços especializados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {categories.map((category) => (
                          <div key={category}>
                            <h3 className="text-xl font-medium mb-4">{categoryNames[category] || category}</h3>
                            <div className="space-y-4">
                              {servicesByCategory[category].map((service) => (
                                <div key={service.id} className="flex justify-between items-center p-4 border-b">
                                  <div>
                                    <h4 className="font-medium">{service.name}</h4>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                    <p className="text-sm text-gray-500">{service.duration} min</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">R$ {service.price.toFixed(2)}</p>
                                    <Button asChild size="sm" variant="outline" className="mt-2">
                                      <Link to={`/booking?salon=${id}&service=${service.id}`}>
                                        Agendar
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="team">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nossa Equipe</CardTitle>
                      <CardDescription>
                        Conheça os profissionais que fazem a diferença
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {displayProfessionals.map((professional) => (
                          <div key={professional.id} className="flex flex-col items-center text-center">
                            <div 
                              className="w-32 h-32 rounded-full bg-cover bg-center mb-4"
                              style={{ 
                                backgroundImage: professional.photo_url 
                                  ? `url(${professional.photo_url})` 
                                  : "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300')"
                              }}
                            ></div>
                            <h4 className="font-medium">{professional.name}</h4>
                            {professional.position && (
                              <p className="text-sm text-gray-600">{professional.position}</p>
                            )}
                            {professional.bio && (
                              <p className="text-sm text-gray-500 mt-2">{professional.bio}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Agende seu Horário</CardTitle>
                  <CardDescription>
                    Escolha um serviço para agendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-purple-800 hover:bg-purple-900">
                    <Link to={`/booking?salon=${id}`} className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Agendar Agora
                    </Link>
                  </Button>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Serviços Populares</h4>
                    <div className="space-y-2">
                      {displayServices.slice(0, 3).map((service) => (
                        <div key={service.id} className="flex justify-between items-center p-2 border-b">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-xs text-gray-500">{service.duration} min</p>
                          </div>
                          <p className="font-medium">R$ {service.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Button asChild variant="link" className="mt-4 w-full">
                      <Link to="#" onClick={(e) => {
                        e.preventDefault();
                        const servicesTab = document.querySelector('[data-value="services"]');
                        if (servicesTab instanceof HTMLElement) {
                          servicesTab.click();
                        }
                      }}>
                        Ver todos os serviços <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SalonDetail;
