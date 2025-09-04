-- Fase 1: Reestruturação do Banco de Dados

-- 1. Criar enum para tipos de negócio
CREATE TYPE public.business_type AS ENUM (
  'beauty_salon',
  'marketplace_store', 
  'b2b_supplier'
);

-- 2. Adicionar campo business_types à tabela companies
ALTER TABLE public.companies 
ADD COLUMN business_types business_type[] DEFAULT ARRAY['beauty_salon'::business_type];

-- 3. Criar tabela company_profiles para configurações específicas por perfil
CREATE TABLE public.company_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  business_type business_type NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  configuration JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id, business_type)
);

-- 4. Habilitar RLS na tabela company_profiles
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

-- 5. Criar políticas RLS para company_profiles
CREATE POLICY "Users can view profiles for their company" 
ON public.company_profiles 
FOR SELECT 
USING (company_id = get_user_company_id());

CREATE POLICY "Company admins can manage profiles" 
ON public.company_profiles 
FOR ALL 
USING (user_has_role_in_company(company_id, 'admin'::text));

-- 6. Adicionar campo profile_permissions à tabela company_users
ALTER TABLE public.company_users 
ADD COLUMN profile_permissions JSONB DEFAULT '{}';

-- 7. Criar trigger para atualizar updated_at em company_profiles
CREATE TRIGGER update_company_profiles_updated_at
BEFORE UPDATE ON public.company_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Inserir perfis padrão para empresas existentes
INSERT INTO public.company_profiles (company_id, business_type, is_active, configuration)
SELECT id, 'beauty_salon'::business_type, true, '{}'
FROM public.companies
ON CONFLICT (company_id, business_type) DO NOTHING;