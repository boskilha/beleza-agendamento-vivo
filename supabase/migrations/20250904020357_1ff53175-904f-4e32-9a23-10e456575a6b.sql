-- Corrigir a política RLS da tabela companies para permitir inserção durante registro
-- O problema é que a política atual pode estar conflitando ou não funcionando

-- Primeiro, vamos remover a política atual de inserção
DROP POLICY IF EXISTS "Anyone can insert companies during registration" ON public.companies;
DROP POLICY IF EXISTS "Enable company creation during registration" ON public.companies;

-- Criar uma nova política mais simples e direta para inserção
-- Esta política permite qualquer usuário autenticado inserir na tabela companies
CREATE POLICY "Allow authenticated users to insert companies" 
ON public.companies 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Também vamos garantir que qualquer usuário autenticado possa ler as empresas que criou
-- (mantendo a política de leitura existente)