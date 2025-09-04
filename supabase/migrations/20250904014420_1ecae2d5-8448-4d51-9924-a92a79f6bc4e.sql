-- Inserir empresa de teste
INSERT INTO public.companies (
  id,
  name,
  cnpj,
  email,
  phone,
  address
) VALUES (
  'c1234567-89ab-cdef-0123-456789abcdef',
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
  'e1111111-89ab-cdef-0123-456789abcdef',
  'Maria Silva',
  'maria@salaobeleza.com.br',
  '(11) 98888-8888',
  ARRAY['Corte', 'Escova', 'Coloração'],
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  'e2222222-89ab-cdef-0123-456789abcdef',
  'João Santos',
  'joao@salaobeleza.com.br',
  '(11) 97777-7777',
  ARRAY['Corte masculino', 'Barba', 'Bigode'],
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  'e3333333-89ab-cdef-0123-456789abcdef',
  'Ana Costa',
  'ana@salaobeleza.com.br',
  '(11) 96666-6666',
  ARRAY['Manicure', 'Pedicure', 'Unha gel'],
  'c1234567-89ab-cdef-0123-456789abcdef',
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
  's1111111-89ab-cdef-0123-456789abcdef',
  'Corte Feminino',
  'Corte de cabelo feminino com lavagem e finalização',
  80.00,
  60,
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  's2222222-89ab-cdef-0123-456789abcdef',
  'Corte Masculino',
  'Corte de cabelo masculino tradicional',
  35.00,
  30,
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  's3333333-89ab-cdef-0123-456789abcdef',
  'Escova',
  'Escova modeladora com produtos profissionais',
  50.00,
  45,
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  's4444444-89ab-cdef-0123-456789abcdef',
  'Coloração',
  'Coloração completa com tinta profissional',
  150.00,
  120,
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  's5555555-89ab-cdef-0123-456789abcdef',
  'Barba',
  'Aparar e modelar barba com navalha',
  25.00,
  20,
  'c1234567-89ab-cdef-0123-456789abcdef',
  true
),
(
  's6666666-89ab-cdef-0123-456789abcdef',
  'Manicure',
  'Cuidados completos para as unhas das mãos',
  30.00,
  40,
  'c1234567-89ab-cdef-0123-456789abcdef',
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
  'a1111111-89ab-cdef-0123-456789abcdef',
  'Carla Mendes',
  'carla@email.com',
  '(11) 98765-4321',
  CURRENT_DATE + INTERVAL '1 day',
  '09:00:00',
  's1111111-89ab-cdef-0123-456789abcdef',
  'e1111111-89ab-cdef-0123-456789abcdef',
  'c1234567-89ab-cdef-0123-456789abcdef',
  'scheduled',
  'Cliente prefere corte em camadas'
),
(
  'a2222222-89ab-cdef-0123-456789abcdef',
  'Roberto Silva',
  'roberto@email.com',
  '(11) 97654-3210',
  CURRENT_DATE,
  '14:00:00',
  's2222222-89ab-cdef-0123-456789abcdef',
  'e2222222-89ab-cdef-0123-456789abcdef',
  'c1234567-89ab-cdef-0123-456789abcdef',
  'confirmed',
  'Corte social para entrevista'
),
(
  'a3333333-89ab-cdef-0123-456789abcdef',
  'Julia Santos',
  'julia@email.com',
  '(11) 96543-2109',
  CURRENT_DATE + INTERVAL '2 days',
  '10:30:00',
  's6666666-89ab-cdef-0123-456789abcdef',
  'e3333333-89ab-cdef-0123-456789abcdef',
  'c1234567-89ab-cdef-0123-456789abcdef',
  'scheduled',
  'Primeira vez no salão'
),
(
  'a4444444-89ab-cdef-0123-456789abcdef',
  'Patricia Oliveira',
  'patricia@email.com',
  '(11) 95432-1098',
  CURRENT_DATE - INTERVAL '1 day',
  '16:00:00',
  's4444444-89ab-cdef-0123-456789abcdef',
  'e1111111-89ab-cdef-0123-456789abcdef',
  'c1234567-89ab-cdef-0123-456789abcdef',
  'completed',
  'Coloração loiro'
),
(
  'a5555555-89ab-cdef-0123-456789abcdef',
  'Fernando Costa',
  'fernando@email.com',
  '(11) 94321-0987',
  CURRENT_DATE + INTERVAL '3 days',
  '11:00:00',
  's5555555-89ab-cdef-0123-456789abcdef',
  'e2222222-89ab-cdef-0123-456789abcdef',
  'c1234567-89ab-cdef-0123-456789abcdef',
  'scheduled',
  'Manutenção da barba'
);