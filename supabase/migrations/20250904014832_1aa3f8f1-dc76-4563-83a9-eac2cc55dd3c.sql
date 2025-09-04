-- Clean up existing test data and create consolidated company with specified CNPJ
DELETE FROM appointments;
DELETE FROM services;  
DELETE FROM employees;
DELETE FROM company_users;
DELETE FROM companies;

-- Insert company with the specified CNPJ
INSERT INTO companies (id, name, email, cnpj, phone, address) VALUES 
(gen_random_uuid(), 'Salão Beleza Premium', 'contato@belezapremium.com', '25.075.476/0001-12', '(11) 99999-9999', 'Rua das Flores, 123 - São Paulo, SP');

-- Get the company ID for use in subsequent inserts
DO $$
DECLARE
  company_uuid uuid;
BEGIN
  SELECT id INTO company_uuid FROM companies WHERE cnpj = '25.075.476/0001-12';
  
  -- Insert employees
  INSERT INTO employees (id, name, email, phone, specialties, company_id, active) VALUES 
  (gen_random_uuid(), 'Maria Silva', 'maria@belezapremium.com', '(11) 98888-1111', ARRAY['corte', 'coloração'], company_uuid, true),
  (gen_random_uuid(), 'João Santos', 'joao@belezapremium.com', '(11) 98888-2222', ARRAY['corte masculino', 'barba'], company_uuid, true),
  (gen_random_uuid(), 'Ana Costa', 'ana@belezapremium.com', '(11) 98888-3333', ARRAY['manicure', 'pedicure'], company_uuid, true);

  -- Insert services
  INSERT INTO services (id, name, description, price, duration, company_id, active) VALUES 
  (gen_random_uuid(), 'Corte Feminino', 'Corte de cabelo feminino personalizado', 80.00, 60, company_uuid, true),
  (gen_random_uuid(), 'Corte Masculino', 'Corte de cabelo masculino moderno', 45.00, 30, company_uuid, true),
  (gen_random_uuid(), 'Escova', 'Escova modeladora profissional', 60.00, 45, company_uuid, true),
  (gen_random_uuid(), 'Coloração', 'Coloração completa do cabelo', 150.00, 120, company_uuid, true),
  (gen_random_uuid(), 'Barba', 'Aparar e modelar barba', 35.00, 30, company_uuid, true),
  (gen_random_uuid(), 'Manicure', 'Cuidados completos das unhas das mãos', 40.00, 45, company_uuid, true);

  -- Insert appointments using service and employee IDs
  INSERT INTO appointments (
    id, client_name, client_email, client_phone, appointment_date, appointment_time, 
    status, notes, company_id, service_id, employee_id
  ) 
  SELECT 
    gen_random_uuid(),
    vals.client_name,
    vals.client_email, 
    vals.client_phone,
    vals.appointment_date,
    vals.appointment_time,
    vals.status,
    vals.notes,
    company_uuid,
    s.id,
    e.id
  FROM (VALUES 
    ('Ana Maria', 'ana.maria@email.com', '(11) 99111-1111', '2024-01-15'::date, '10:00'::time, 'scheduled', 'Cliente preferencial', 'Corte Feminino', 'Maria Silva'),
    ('Carlos Santos', 'carlos@email.com', '(11) 99222-2222', '2024-01-16'::date, '14:30'::time, 'confirmed', 'Primeira vez no salão', 'Corte Masculino', 'João Santos'),
    ('Beatriz Lima', 'beatriz@email.com', '(11) 99333-3333', '2024-01-14'::date, '09:00'::time, 'completed', 'Muito satisfeita', 'Coloração', 'Maria Silva'),
    ('Roberto Silva', 'roberto@email.com', '(11) 99444-4444', '2024-01-17'::date, '16:00'::time, 'scheduled', NULL, 'Barba', 'João Santos'),
    ('Fernanda Costa', 'fernanda@email.com', '(11) 99555-5555', '2024-01-18'::date, '11:30'::time, 'confirmed', 'Indicação de amiga', 'Manicure', 'Ana Costa')
  ) AS vals(client_name, client_email, client_phone, appointment_date, appointment_time, status, notes, service_name, employee_name)
  JOIN services s ON s.name = vals.service_name AND s.company_id = company_uuid
  JOIN employees e ON e.name = vals.employee_name AND e.company_id = company_uuid;
  
END $$;