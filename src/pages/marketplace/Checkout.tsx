import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Smartphone, Coins, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCheckout } from "@/hooks/useCheckout";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: string;
  notes: string;
  // Service-specific fields
  serviceDate: string;
  serviceTime: string;
}

const Checkout = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get("type") || "mixed";
  const { processCheckout, isSubmitting } = useCheckout();

  // Filter items based on order type
  const filteredItems = orderType === "service" 
    ? items.filter(item => item.type === 'service')
    : orderType === "product"
    ? items.filter(item => item.type === 'product')
    : items;

  const filteredTotal = filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const hasServices = filteredItems.some(item => item.type === 'service');
  const hasProducts = filteredItems.some(item => item.type === 'product');

  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "",
    notes: "",
    serviceDate: "",
    serviceTime: "",
  });

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    // Basic required fields
    const basicRequired = ['name', 'email', 'phone'];
    
    // Address required only for products
    const addressRequired = hasProducts ? 
      ['address', 'number', 'neighborhood', 'city', 'state', 'zipCode'] : [];
    
    // Service fields required only for services
    const serviceRequired = hasServices ? 
      ['serviceDate', 'serviceTime'] : [];
    
    const allRequired = [...basicRequired, ...addressRequired, ...serviceRequired, 'paymentMethod'];
    
    for (const field of allRequired) {
      if (!formData[field as keyof CheckoutForm]) {
        alert(`Por favor, preencha o campo: ${field}`);
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const checkoutData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: hasProducts ? {
        street: formData.address,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      } : undefined,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
    };

    // For services, add scheduling info to items
    const itemsWithScheduling = filteredItems.map(item => ({
      ...item,
      serviceDate: item.type === 'service' ? formData.serviceDate : undefined,
      serviceTime: item.type === 'service' ? formData.serviceTime : undefined,
    }));

    const finalOrderType = orderType === "service" ? 'service_booking' as const
      : orderType === "product" ? 'product_order' as const
      : 'mixed' as const;

    await processCheckout(itemsWithScheduling, checkoutData, finalOrderType);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-light mb-4">Carrinho vazio</h2>
            <p className="text-gray-600 mb-6">
              Adicione itens ao carrinho para continuar com o checkout.
            </p>
            <Button asChild className="bg-purple-800 hover:bg-purple-900">
              <Link to="/marketplace">Explorar produtos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/cart">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao carrinho
              </Link>
            </Button>
            <h1 className="text-3xl font-serif font-light">
              {orderType === "service" ? "Finalizar Agendamento" 
               : orderType === "product" ? "Finalizar Compra" 
               : "Finalizar Pedido"}
            </h1>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Personal Data */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:bg-gray-50">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center justify-between">
                          <span>Dados Pessoais</span>
                          <ChevronDown className="w-5 h-5" />
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2">
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Nome Completo *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Seu nome completo"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Telefone *</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="(11) 99999-9999"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                            required
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Service Scheduling - Only for services */}
                {hasServices && (
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer hover:bg-gray-50">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5" />
                              <span>Agendamento</span>
                            </div>
                            <ChevronDown className="w-5 h-5" />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2">
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="serviceDate">Data do Agendamento *</Label>
                              <Input
                                id="serviceDate"
                                type="date"
                                value={formData.serviceDate}
                                onChange={(e) => handleInputChange('serviceDate', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="serviceTime">Horário *</Label>
                              <Select 
                                value={formData.serviceTime} 
                                onValueChange={(value) => handleInputChange('serviceTime', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o horário" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Delivery Address - Only for products */}
                {hasProducts && (
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer hover:bg-gray-50">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center justify-between">
                            <span>Endereço de Entrega</span>
                            <ChevronDown className="w-5 h-5" />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2">
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3">
                              <Label htmlFor="address">Endereço *</Label>
                              <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Rua, Avenida..."
                                required={hasProducts}
                              />
                            </div>
                            <div>
                              <Label htmlFor="number">Número *</Label>
                              <Input
                                id="number"
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                placeholder="123"
                                required={hasProducts}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="complement">Complemento</Label>
                              <Input
                                id="complement"
                                value={formData.complement}
                                onChange={(e) => handleInputChange('complement', e.target.value)}
                                placeholder="Apto, Bloco..."
                              />
                            </div>
                            <div>
                              <Label htmlFor="neighborhood">Bairro *</Label>
                              <Input
                                id="neighborhood"
                                value={formData.neighborhood}
                                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                                placeholder="Nome do bairro"
                                required={hasProducts}
                              />
                            </div>
                            <div>
                              <Label htmlFor="zipCode">CEP *</Label>
                              <Input
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                placeholder="00000-000"
                                required={hasProducts}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">Cidade *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="Nome da cidade"
                                required={hasProducts}
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">Estado *</Label>
                              <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                placeholder="SP"
                                maxLength={2}
                                required={hasProducts}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Payment Method */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:bg-gray-50">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center justify-between">
                          <span>Método de Pagamento</span>
                          <ChevronDown className="w-5 h-5" />
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Button
                            type="button"
                            variant={formData.paymentMethod === "pix" ? "default" : "outline"}
                            onClick={() => handleInputChange('paymentMethod', 'pix')}
                            className="h-20 flex flex-col items-center gap-2"
                          >
                            <Smartphone className="w-6 h-6" />
                            PIX
                          </Button>
                          <Button
                            type="button"
                            variant={formData.paymentMethod === "card" ? "default" : "outline"}
                            onClick={() => handleInputChange('paymentMethod', 'card')}
                            className="h-20 flex flex-col items-center gap-2"
                          >
                            <CreditCard className="w-6 h-6" />
                            Cartão
                          </Button>
                          <Button
                            type="button"
                            variant={formData.paymentMethod === "mumbuca" ? "default" : "outline"}
                            onClick={() => handleInputChange('paymentMethod', 'mumbuca')}
                            className="h-20 flex flex-col items-center gap-2"
                          >
                            <Coins className="w-6 h-6" />
                            Mumbuca
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Notes */}
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:bg-gray-50">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center justify-between">
                          <span>Observações</span>
                          <ChevronDown className="w-5 h-5" />
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2">
                      <CardContent className="pt-6">
                        <Textarea
                          value={formData.notes}
                          onChange={(e) => handleInputChange('notes', e.target.value)}
                          placeholder="Observações especiais..."
                          rows={3}
                        />
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {filteredItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">
                              {item.type === 'service' ? `Serviço` : `Qtd: ${item.quantity}`} • {item.seller}
                            </p>
                          </div>
                          <p className="font-medium text-sm">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'})</span>
                        <span>R$ {filteredTotal.toFixed(2)}</span>
                      </div>
                      
                      {hasProducts && (
                        <div className="flex justify-between">
                          <span>Frete</span>
                          <span className="text-green-600">Grátis</span>
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>R$ {filteredTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-800 hover:bg-purple-900"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processando..." : 
                       orderType === "service" ? "Confirmar Agendamento" : 
                       "Finalizar Pedido"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;