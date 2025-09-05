-- Create enum for product categories
CREATE TYPE public.product_category AS ENUM (
  'beleza',
  'cabelo', 
  'unha',
  'estetica',
  'maquiagem',
  'equipamentos',
  'mobiliario',
  'outros'
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category product_category NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
CREATE POLICY "Suppliers can view their own products" 
ON public.products 
FOR SELECT 
USING (auth.uid() IN (
  SELECT cu.user_id 
  FROM company_users cu 
  WHERE cu.company_id = products.company_id
));

CREATE POLICY "Suppliers can create their own products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() IN (
  SELECT cu.user_id 
  FROM company_users cu 
  WHERE cu.company_id = products.company_id
  AND cu.role IN ('owner', 'admin')
));

CREATE POLICY "Suppliers can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() IN (
  SELECT cu.user_id 
  FROM company_users cu 
  WHERE cu.company_id = products.company_id
  AND cu.role IN ('owner', 'admin')
));

CREATE POLICY "Suppliers can delete their own products" 
ON public.products 
FOR DELETE 
USING (auth.uid() IN (
  SELECT cu.user_id 
  FROM company_users cu 
  WHERE cu.company_id = products.company_id
  AND cu.role IN ('owner', 'admin')
));

CREATE POLICY "All users can view active products from B2B suppliers" 
ON public.products 
FOR SELECT 
USING (
  is_active = true 
  AND company_id IN (
    SELECT cp.company_id 
    FROM company_profiles cp 
    WHERE cp.business_type = 'b2b_supplier' 
    AND cp.is_active = true
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_products_company_id ON public.products(company_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);