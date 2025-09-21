import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { supabase } from "@/integrations/supabase/client";
import { clearCart, CartItem } from "@/store/slices/cartSlice";
import { useToast } from "@/hooks/use-toast";

interface CheckoutData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  notes?: string;
}

export const useCheckout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const processCheckout = async (
    items: CartItem[],
    checkoutData: CheckoutData,
    orderType: 'product_order' | 'service_booking' | 'mixed'
  ) => {
    setIsSubmitting(true);
    
    try {
      if (orderType === 'mixed') {
        // Process services and products separately
        const services = items.filter(item => item.type === 'service');
        const products = items.filter(item => item.type === 'product');
        
        if (services.length > 0) {
          await processOrder(services, checkoutData, 'service_booking');
        }
        
        if (products.length > 0) {
          await processOrder(products, checkoutData, 'product_order');
        }
      } else {
        await processOrder(items, checkoutData, orderType);
      }

      // Clear cart and redirect
      dispatch(clearCart());
      
      toast({
        title: "Sucesso!",
        description: orderType === 'service_booking' ? 
          "Agendamento realizado com sucesso!" : 
          "Pedido realizado com sucesso!",
      });

      navigate(`/order-success?type=${orderType}&orderId=${Date.now()}`);
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Erro",
        description: "Houve um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const processOrder = async (
    items: CartItem[],
    checkoutData: CheckoutData,
    type: 'product_order' | 'service_booking'
  ) => {
    // Group items by company/salon
    const itemsByCompany = items.reduce((acc, item) => {
      const companyId = item.companyId || item.salonId || 'default';
      if (!acc[companyId]) {
        acc[companyId] = [];
      }
      acc[companyId].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);

    // Create separate orders for each company
    for (const [companyId, companyItems] of Object.entries(itemsByCompany)) {
      const total = companyItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Create main order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: checkoutData.customerName,
          customer_email: checkoutData.customerEmail,
          customer_phone: checkoutData.customerPhone,
          total_amount: total,
          payment_method: checkoutData.paymentMethod,
          order_type: type,
          company_id: companyId === 'default' ? null : companyId,
          customer_address: checkoutData.customerAddress,
          notes: checkoutData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = companyItems.map(item => ({
        order_id: order.id,
        product_id: item.type === 'product' ? item.id : null,
        service_id: item.type === 'service' ? item.id : null,
        item_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        appointment_date: item.serviceDate || null,
        appointment_time: item.serviceTime || null,
        employee_id: item.employeeId || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // For service bookings, also create appointment records
      if (type === 'service_booking') {
        for (const item of companyItems.filter(i => i.type === 'service')) {
          if (item.serviceDate && item.serviceTime && item.id) {
            const { error: appointmentError } = await supabase
              .from('appointments')
              .insert({
                service_id: item.id,
                company_id: companyId === 'default' ? null : companyId,
                employee_id: item.employeeId || null,
                appointment_date: item.serviceDate,
                appointment_time: item.serviceTime,
                client_name: checkoutData.customerName,
                client_email: checkoutData.customerEmail,
                client_phone: checkoutData.customerPhone,
                notes: checkoutData.notes,
                status: 'from_cart',
              });

            if (appointmentError) {
              console.error('Error creating appointment:', appointmentError);
              // Don't throw here as the order was already created
            }
          }
        }
      }
    }
  };

  return {
    processCheckout,
    isSubmitting,
  };
};