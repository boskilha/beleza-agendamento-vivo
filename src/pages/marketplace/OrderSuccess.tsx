import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("type");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const isServiceBooking = orderType === "service_booking";

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-serif">
                {isServiceBooking ? "Agendamento Confirmado!" : "Pedido Realizado com Sucesso!"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-gray-600">
                {isServiceBooking ? (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Calendar className="w-5 h-5" />
                      <span>Seu agendamento foi enviado ao salão</span>
                    </div>
                    <p className="mb-4">
                      Você receberá uma confirmação por email em breve com todos os detalhes
                      do seu agendamento.
                    </p>
                    <p className="text-sm text-gray-500">
                      Código do agendamento: <strong>#{orderId}</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Package className="w-5 h-5" />
                      <span>Seu pedido foi enviado aos fornecedores</span>
                    </div>
                    <p className="mb-4">
                      Os fornecedores irão processar seu pedido e você receberá atualizações
                      sobre o status da entrega.
                    </p>
                    <p className="text-sm text-gray-500">
                      Número do pedido: <strong>#{orderId}</strong>
                    </p>
                  </>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/")}
                  className="bg-purple-800 hover:bg-purple-900"
                >
                  Voltar ao Início
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate(isServiceBooking ? "/services" : "/marketplace")}
                >
                  {isServiceBooking ? "Ver Mais Serviços" : "Continuar Comprando"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;