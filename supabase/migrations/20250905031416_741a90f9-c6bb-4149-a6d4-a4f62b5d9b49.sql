-- Add foreign key constraint between products and companies
ALTER TABLE public.products 
ADD CONSTRAINT products_company_id_fkey 
FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;