-- Primeiro, vou verificar qual empresa de teste usar
SELECT id, name, email FROM companies WHERE name LIKE '%Spa Relaxamento Total%' LIMIT 1;