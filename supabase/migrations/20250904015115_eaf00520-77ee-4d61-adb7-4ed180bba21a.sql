-- Inserir empresa de teste com email único
WITH company_insert AS (
  INSERT INTO public.companies (
    name,
    cnpj,
    email,
    phone,
    address
  ) VALUES (
    'Spa Relaxamento Total',
    '55444333000122',
    'contato@sparelaxamento.com.br',
    '(11) 91234-5678',
    'Av. Bem-estar, 789 - São Paulo, SP'
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
    ('Leticia Massagista', 'leticia@sparelaxamento.com.br', '(11) 91111-2222', ARRAY['Massagem relaxante', 'Drenagem linfática', 'Reflexologia'], true),
    ('Ricardo Esteticista', 'ricardo@sparelaxamento.com.br', '(11) 92222-3333', ARRAY['Limpeza de pele', 'Peeling', 'Hidratação facial'], true),
    ('Amanda Terapeuta', 'amanda@sparelaxamento.com.br', '(11) 93333-4444', ARRAY['Aromaterapia', 'Acupuntura', 'Reiki'], true)
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
    ('Massagem Relaxante', 'Massagem corporal completa para relaxamento', 120.00, 60, true),
    ('Limpeza de Pele', 'Tratamento facial profundo', 90.00, 90, true),
    ('Drenagem Linfática', 'Tratamento para redução de inchaço', 100.00, 60, true),
    ('Aromaterapia', 'Sessão de relaxamento com óleos essenciais', 80.00, 45, true),
    ('Peeling Facial', 'Renovação celular da pele do rosto', 150.00, 75, true),
    ('Day Spa Completo', 'Pacote completo de relaxamento', 300.00, 240, true)
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
       ('Sofia Mendes', 'sofia@cliente.com', '(11) 88877-6655', CURRENT_DATE + INTERVAL '1 day', '09:30:00'::time, 'Massagem Relaxante', 'Leticia Massagista', 'scheduled', 'Stress do trabalho'),
       ('Diego Fernandes', 'diego@cliente.com', '(11) 88766-5544', CURRENT_DATE, '15:00:00'::time, 'Limpeza de Pele', 'Ricardo Esteticista', 'confirmed', 'Primeira limpeza'),
       ('Gabriela Torres', 'gabriela@cliente.com', '(11) 88655-4433', CURRENT_DATE + INTERVAL '2 days', '11:00:00'::time, 'Aromaterapia', 'Amanda Terapeuta', 'scheduled', 'Ansiedade'),
       ('Marcos Silva', 'marcos@cliente.com', '(11) 88544-3322', CURRENT_DATE - INTERVAL '1 day', '14:30:00'::time, 'Drenagem Linfática', 'Leticia Massagista', 'completed', 'Pós-cirúrgico'),
       ('Isabela Costa', 'isabela@cliente.com', '(11) 88433-2211', CURRENT_DATE + INTERVAL '3 days', '10:00:00'::time, 'Day Spa Completo', 'Amanda Terapeuta', 'scheduled', 'Aniversário especial')
     ) AS appointments_data(client_name, client_email, client_phone, appointment_date, appointment_time, service_name, employee_name, status, notes)
WHERE s.name = appointments_data.service_name
  AND e.name = appointments_data.employee_name;