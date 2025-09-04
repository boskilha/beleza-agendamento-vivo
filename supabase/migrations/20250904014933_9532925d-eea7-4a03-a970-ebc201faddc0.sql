-- Inserir empresa de teste
WITH company_insert AS (
  INSERT INTO public.companies (
    name,
    cnpj,
    email,
    phone,
    address
  ) VALUES (
    'Salão Beleza Premium',
    '98765432000101',
    'teste@salaobeleza.com.br',
    '(11) 99999-9999',
    'Rua das Flores, 123 - São Paulo, SP'
  ) RETURNING id
),
-- Inserir funcionários de teste
employees_insert AS (
  INSERT INTO public.employees (
    name,
    email,
    phone,
    specialties,
    company_id,
    active
  ) 
  SELECT 
    name, email, phone, specialties, company_insert.id, active
  FROM company_insert,
  (VALUES 
    ('Maria Silva', 'maria@salaobeleza.com.br', '(11) 98888-8888', ARRAY['Corte', 'Escova', 'Coloração'], true),
    ('João Santos', 'joao@salaobeleza.com.br', '(11) 97777-7777', ARRAY['Corte masculino', 'Barba', 'Bigode'], true),
    ('Ana Costa', 'ana@salaobeleza.com.br', '(11) 96666-6666', ARRAY['Manicure', 'Pedicure', 'Unha gel'], true)
  ) AS v(name, email, phone, specialties, active)
  RETURNING id, name
),
-- Inserir serviços de teste
services_insert AS (
  INSERT INTO public.services (
    name,
    description,
    price,
    duration,
    company_id,
    active
  )
  SELECT 
    name, description, price, duration, company_insert.id, active
  FROM company_insert,
  (VALUES 
    ('Corte Feminino', 'Corte de cabelo feminino com lavagem e finalização', 80.00, 60, true),
    ('Corte Masculino', 'Corte de cabelo masculino tradicional', 35.00, 30, true),
    ('Escova', 'Escova modeladora com produtos profissionais', 50.00, 45, true),
    ('Coloração', 'Coloração completa com tinta profissional', 150.00, 120, true),
    ('Barba', 'Aparar e modelar barba com navalha', 25.00, 20, true),
    ('Manicure', 'Cuidados completos para as unhas das mãos', 30.00, 40, true)
  ) AS v(name, description, price, duration, active)
  RETURNING id, name
)
-- Inserir agendamentos de teste
INSERT INTO public.appointments (
  client_name,
  client_email,
  client_phone,
  appointment_date,
  appointment_time,
  service_id,
  employee_id,
  company_id,
  status,
  notes
)
SELECT 
  appointments_data.client_name,
  appointments_data.client_email,
  appointments_data.client_phone,
  appointments_data.appointment_date,
  appointments_data.appointment_time,
  s.id,
  e.id,
  c.id,
  appointments_data.status,
  appointments_data.notes
FROM company_insert c,
     services_insert s,
     employees_insert e,
     (VALUES 
       ('Carla Mendes', 'carla@email.com', '(11) 98765-4321', CURRENT_DATE + INTERVAL '1 day', '09:00:00'::time, 'Corte Feminino', 'Maria Silva', 'scheduled', 'Cliente prefere corte em camadas'),
       ('Roberto Silva', 'roberto@email.com', '(11) 97654-3210', CURRENT_DATE, '14:00:00'::time, 'Corte Masculino', 'João Santos', 'confirmed', 'Corte social para entrevista'),
       ('Julia Santos', 'julia@email.com', '(11) 96543-2109', CURRENT_DATE + INTERVAL '2 days', '10:30:00'::time, 'Manicure', 'Ana Costa', 'scheduled', 'Primeira vez no salão'),
       ('Patricia Oliveira', 'patricia@email.com', '(11) 95432-1098', CURRENT_DATE - INTERVAL '1 day', '16:00:00'::time, 'Coloração', 'Maria Silva', 'completed', 'Coloração loiro'),
       ('Fernando Costa', 'fernando@email.com', '(11) 94321-0987', CURRENT_DATE + INTERVAL '3 days', '11:00:00'::time, 'Barba', 'João Santos', 'scheduled', 'Manutenção da barba')
     ) AS appointments_data(client_name, client_email, client_phone, appointment_date, appointment_time, service_name, employee_name, status, notes)
WHERE s.name = appointments_data.service_name
  AND e.name = appointments_data.employee_name;