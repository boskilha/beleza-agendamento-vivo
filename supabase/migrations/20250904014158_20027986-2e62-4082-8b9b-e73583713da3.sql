-- Add CNPJ field to companies table
ALTER TABLE public.companies 
ADD COLUMN cnpj TEXT UNIQUE;

-- Add constraint to ensure CNPJ has 14 digits
ALTER TABLE public.companies 
ADD CONSTRAINT cnpj_format_check CHECK (cnpj ~ '^[0-9]{14}$');

-- Create index for better performance on CNPJ lookups
CREATE INDEX idx_companies_cnpj ON public.companies(cnpj);