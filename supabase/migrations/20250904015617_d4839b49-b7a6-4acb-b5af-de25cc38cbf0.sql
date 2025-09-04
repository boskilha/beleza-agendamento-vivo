-- Atualizar as empresas de teste com CNPJs válidos
UPDATE companies 
SET cnpj = '11222333000181'
WHERE name = 'Spa Relaxamento Total';

UPDATE companies 
SET cnpj = '11444555000160' 
WHERE name = 'Barbearia Tradicional';

UPDATE companies 
SET cnpj = '22333444000150'
WHERE name = 'Clínica Estética Moderna';