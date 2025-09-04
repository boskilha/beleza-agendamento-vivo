-- Inserir empresa de teste com email único
WITH company_insert AS (
  INSERT INTO public.companies (
    name,
    cnpj,
    email,
    phone,
    address
  ) VALUES (
    'Barbearia Tradicional',
    '11222333000144',
    'teste@barbeariatradicional.com.br',
    '(11) 98888-7777',
    'Rua dos Barbudos, 456 - São Paulo, SP'
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
    ('Carlos Barbeiro', 'carlos@barbeariatradicional.com.br', '(11) 97777-6666', ARRAY['Corte masculino', 'Barba', 'Bigode'], true),
    ('Fernanda Estilista', 'fernanda@barbeariatradicional.com.br', '(11) 96666-5555', ARRAY['Corte feminino', 'Escova', 'Penteados'], true),
    ('Paulo Cabeleireiro', 'paulo@barbeariatradicional.com.br', '(11) 95555-4444', ARRAY['Corte', 'Coloração', 'Luzes'], true)
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
    ('Corte Social', 'Corte de cabelo social masculino', 40.00, 30, true),
    ('Corte + Barba', 'Corte completo com barba', 55.00, 45, true),
    ('Corte Feminino Premium', 'Corte feminino com lavagem e finalização', 85.00, 60, true),
    ('Escova Progressiva', 'Tratamento para alisar cabelo', 200.00, 180, true),
    ('Coloração Completa', 'Mudança completa de cor', 160.00, 120, true),
    ('Hidratação', 'Tratamento hidratante para cabelo', 45.00, 40, true)
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
       ('André Costa', 'andre@teste.com', '(11) 99988-7766', CURRENT_DATE + INTERVAL '1 day', '09:00:00'::time, 'Corte Social', 'Carlos Barbeiro', 'scheduled', 'Cliente executivo'),
       ('Lucas Santos', 'lucas@teste.com', '(11) 99887-6655', CURRENT_DATE, '14:00:00'::time, 'Corte + Barba', 'Carlos Barbeiro', 'confirmed', 'Preparação para casamento'),
       ('Marina Oliveira', 'marina@teste.com', '(11) 99776-5544', CURRENT_DATE + INTERVAL '2 days', '10:30:00'::time, 'Corte Feminino Premium', 'Fernanda Estilista', 'scheduled', 'Primeira visita'),
       ('Camila Silva', 'camila@teste.com', '(11) 99665-4433', CURRENT_DATE - INTERVAL '1 day', '16:00:00'::time, 'Coloração Completa', 'Paulo Cabeleireiro', 'completed', 'Mudança para loiro'),
       ('Roberto Lima', 'roberto@teste.com', '(11) 99554-3322', CURRENT_DATE + INTERVAL '3 days', '11:00:00'::time, 'Hidratação', 'Paulo Cabeleireiro', 'scheduled', 'Cabelo ressecado')
     ) AS appointments_data(client_name, client_email, client_phone, appointment_date, appointment_time, service_name, employee_name, status, notes)
WHERE s.name = appointments_data.service_name
  AND e.name = appointments_data.employee_name;