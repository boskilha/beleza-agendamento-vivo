-- Corrigir políticas RLS para permitir cadastro de empresas
-- Primeiro, remover a política atual de inserção que pode estar causando conflito
DROP POLICY IF EXISTS "Anyone can insert companies during registration" ON public.companies;

-- Recriar a política de inserção com configuração mais explícita
CREATE POLICY "Enable company creation during registration" 
ON public.companies 
FOR INSERT 
WITH CHECK (true);

-- Também precisamos permitir inserção na tabela company_users durante o registro
DROP POLICY IF EXISTS "Company owners/admins can manage company users" ON public.company_users;

-- Recriar política para company_users permitindo inserção durante registro
CREATE POLICY "Enable company_users creation during registration" 
ON public.company_users 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir que owners/admins gerenciem usuários da empresa
CREATE POLICY "Company owners and admins can manage company users" 
ON public.company_users 
FOR ALL 
USING (user_has_role_in_company(company_id, 'admin'::text));

-- Política para permitir que usuários vejam company_users da sua empresa
CREATE POLICY "Users can view company_users for their company" 
ON public.company_users 
FOR SELECT 
USING (company_id = get_user_company_id());