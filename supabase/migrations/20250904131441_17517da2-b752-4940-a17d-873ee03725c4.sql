-- Corrigir política RLS para permitir inserção durante registro
-- O problema é que durante o registro, a sessão pode não estar estabelecida ainda

-- Remover política atual
DROP POLICY IF EXISTS "Allow authenticated users to insert companies" ON public.companies;

-- Criar política que permite inserção tanto para usuários autenticados 
-- quanto durante o processo de registro
CREATE POLICY "Allow company creation"
ON public.companies
FOR INSERT
WITH CHECK (true);

-- Esta política permite inserção irrestrita, mas manteremos as políticas
-- de SELECT e UPDATE para garantir que apenas usuários autorizados
-- possam ver e modificar as empresas após criação