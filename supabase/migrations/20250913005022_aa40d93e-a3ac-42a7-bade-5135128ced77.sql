-- Create orders table for managing all types of orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  order_type TEXT NOT NULL CHECK (order_type IN ('product_order', 'service_booking')),
  company_id UUID NOT NULL,
  customer_address JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table for individual items in orders
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  service_id UUID REFERENCES public.services(id),
  item_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  -- Fields specific to service bookings
  appointment_date DATE,
  appointment_time TIME,
  employee_id UUID REFERENCES public.employees(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Company users can view their orders" 
ON public.orders 
FOR SELECT 
USING (company_id = get_user_company_id());

CREATE POLICY "Company users can manage their orders" 
ON public.orders 
FOR ALL
USING (user_has_role_in_company(company_id, 'employee'::text));

CREATE POLICY "Public can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for order_items
CREATE POLICY "Users can view order items for their company orders" 
ON public.order_items 
FOR SELECT 
USING (order_id IN (
  SELECT id FROM public.orders WHERE company_id = get_user_company_id()
));

CREATE POLICY "Company users can manage order items" 
ON public.order_items 
FOR ALL
USING (order_id IN (
  SELECT id FROM public.orders WHERE user_has_role_in_company(company_id, 'employee'::text)
));

CREATE POLICY "Public can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);

-- Add trigger for updated_at on orders
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_orders_company_id ON public.orders(company_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_order_type ON public.orders(order_type);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_order_items_service_id ON public.order_items(service_id);