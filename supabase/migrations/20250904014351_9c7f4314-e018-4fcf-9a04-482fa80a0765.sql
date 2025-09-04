-- Inserir empresa de teste
INSERT INTO public.companies (
  id,
  name,
  cnpj,
  email,
  phone,
  address
) VALUES (
  'c1234567-1234-1234-1234-123456789012',
  'Salão Beleza Premium',
  '12345678000195',
  'contato@salaobeleza.com.br',
  '(11) 99999-9999',
  'Rua das Flores, 123 - São Paulo, SP'
);

-- Inserir funcionários de teste
INSERT INTO public.employees (
  id,
  name,
  email,
  phone,
  specialties,
  company_id,
  active
) VALUES 
(
  'e1111111-1111-1111-1111-111111111111',
  'Maria Silva',
  'maria@salaobeleza.com.br',
  '(11) 98888-8888',
  ARRAY['Corte', 'Escova', 'Coloração'],
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  'e2222222-2222-2222-2222-222222222222',
  'João Santos',
  'joao@salaobeleza.com.br',
  '(11) 97777-7777',
  ARRAY['Corte masculino', 'Barba', 'Bigode'],
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  'e3333333-3333-3333-3333-333333333333',
  'Ana Costa',
  'ana@salaobeleza.com.br',
  '(11) 96666-6666',
  ARRAY['Manicure', 'Pedicure', 'Unha gel'],
  'c1234567-1234-1234-1234-123456789012',
  true
);

-- Inserir serviços de teste
INSERT INTO public.services (
  id,
  name,
  description,
  price,
  duration,
  company_id,
  active
) VALUES 
(
  's1111111-1111-1111-1111-111111111111',
  'Corte Feminino',
  'Corte de cabelo feminino com lavagem e finalização',
  80.00,
  60,
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  's2222222-2222-2222-2222-222222222222',
  'Corte Masculino',
  'Corte de cabelo masculino tradicional',
  35.00,
  30,
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  's3333333-3333-3333-3333-333333333333',
  'Escova',
  'Escova modeladora com produtos profissionais',
  50.00,
  45,
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  's4444444-4444-4444-4444-444444444444',
  'Coloração',
  'Coloração completa com tinta profissional',
  150.00,
  120,
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  's5555555-5555-5555-5555-555555555555',
  'Barba',
  'Aparar e modelar barba com navalha',
  25.00,
  20,
  'c1234567-1234-1234-1234-123456789012',
  true
),
(
  's6666666-6666-6666-6666-666666666666',
  'Manicure',
  'Cuidados completos para as unhas das mãos',
  30.00,
  40,
  'c1234567-1234-1234-1234-123456789012',
  true
);

-- Inserir agendamentos de teste
INSERT INTO public.appointments (
  id,
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
) VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'Carla Mendes',
  'carla@email.com',
  '(11) 98765-4321',
  CURRENT_DATE + INTERVAL '1 day',
  '09:00:00',
  's1111111-1111-1111-1111-111111111111',
  'e1111111-1111-1111-1111-111111111111',
  'c1234567-1234-1234-1234-123456789012',
  'scheduled',
  'Cliente prefere corte em camadas'
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Roberto Silva',
  'roberto@email.com',
  '(11) 97654-3210',
  CURRENT_DATE,
  '14:00:00',
  's2222222-2222-2222-2222-222222222222',
  'e2222222-2222-2222-2222-222222222222',
  'c1234567-1234-1234-1234-123456789012',
  'confirmed',
  'Corte social para entrevista'
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Julia Santos',
  'julia@email.com',
  '(11) 96543-2109',
  CURRENT_DATE + INTERVAL '2 days',
  '10:30:00',
  's6666666-6666-6666-6666-666666666666',
  'e3333333-3333-3333-3333-333333333333',
  'c1234567-1234-1234-1234-123456789012',
  'scheduled',
  'Primeira vez no salão'
),
(
  'a4444444-4444-4444-4444-444444444444',
  'Patricia Oliveira',
  'patricia@email.com',
  '(11) 95432-1098',
  CURRENT_DATE - INTERVAL '1 day',
  '16:00:00',
  's4444444-4444-4444-4444-444444444444',
  'e1111111-1111-1111-1111-111111111111',
  'c1234567-1234-1234-1234-123456789012',
  'completed',
  'Coloração loiro'
),
(
  'a5555555-5555-5555-5555-555555555555',
  'Fernando Costa',
  'fernando@email.com',
  '(11) 94321-0987',
  CURRENT_DATE + INTERVAL '3 days',
  '11:00:00',
  's5555555-5555-5555-5555-555555555555',
  'e2222222-2222-2222-2222-222222222222',
  'c1234567-1234-1234-1234-123456789012',
  'scheduled',
  'Manutenção da barba'
);