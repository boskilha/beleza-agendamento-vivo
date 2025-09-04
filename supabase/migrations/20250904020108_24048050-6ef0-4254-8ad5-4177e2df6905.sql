-- Corrigir políticas RLS - removendo duplicata e corrigindo estrutura
-- Primeiro, remover as políticas problemáticas
DROP POLICY IF EXISTS "Users can view company_users for their company" ON public.company_users;

-- Recriar política para company_users permitindo inserção durante registro
DROP POLICY IF EXISTS "Enable company_users creation during registration" ON public.company_users;
CREATE POLICY "Enable company_users creation during registration" 
ON public.company_users 
FOR INSERT 
WITH CHECK (true);

-- Política para visualizar company_users da sua empresa
CREATE POLICY "View company_users for own company" 
ON public.company_users 
FOR SELECT 
USING (company_id = get_user_company_id());

-- Política para que owners/admins gerenciem usuários da empresa (UPDATE/DELETE)
DROP POLICY IF EXISTS "Company owners and admins can manage company users" ON public.company_users;
CREATE POLICY "Company admins can manage users" 
ON public.company_users 
FOR UPDATE 
USING (user_has_role_in_company(company_id, 'admin'::text));

CREATE POLICY "Company admins can delete users" 
ON public.company_users 
FOR DELETE 
USING (user_has_role_in_company(company_id, 'admin'::text));