-- Inserir empresa de teste
INSERT INTO public.companies (
  name,
  cnpj,
  email,
  phone,
  address
) VALUES (
  'Salão Beleza Premium',
  '12345678000195',
  'contato@salaobeleza.com.br',
  '(11) 99999-9999',
  'Rua das Flores, 123 - São Paulo, SP'
);

-- Capturar o ID da empresa inserida
DO $$
DECLARE
    company_uuid uuid;
    maria_uuid uuid;
    joao_uuid uuid;
    ana_uuid uuid;
    corte_fem_uuid uuid;
    corte_masc_uuid uuid;
    escova_uuid uuid;
    coloracao_uuid uuid;
    barba_uuid uuid;
    manicure_uuid uuid;
BEGIN
    -- Buscar ID da empresa inserida
    SELECT id INTO company_uuid FROM public.companies WHERE cnpj = '12345678000195';
    
    -- Inserir funcionários
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('Maria Silva', 'maria@salaobeleza.com.br', '(11) 98888-8888', ARRAY['Corte', 'Escova', 'Coloração'], company_uuid, true)
    RETURNING id INTO maria_uuid;
    
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('João Santos', 'joao@salaobeleza.com.br', '(11) 97777-7777', ARRAY['Corte masculino', 'Barba', 'Bigode'], company_uuid, true)
    RETURNING id INTO joao_uuid;
    
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('Ana Costa', 'ana@salaobeleza.com.br', '(11) 96666-6666', ARRAY['Manicure', 'Pedicure', 'Unha gel'], company_uuid, true)
    RETURNING id INTO ana_uuid;
    
    -- Inserir serviços
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Corte Feminino', 'Corte de cabelo feminino com lavagem e finalização', 80.00, 60, company_uuid, true)
    RETURNING id INTO corte_fem_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Corte Masculino', 'Corte de cabelo masculino tradicional', 35.00, 30, company_uuid, true)
    RETURNING id INTO corte_masc_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Escova', 'Escova modeladora com produtos profissionais', 50.00, 45, company_uuid, true)
    RETURNING id INTO escova_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Coloração', 'Coloração completa com tinta profissional', 150.00, 120, company_uuid, true)
    RETURNING id INTO coloracao_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Barba', 'Aparar e modelar barba com navalha', 25.00, 20, company_uuid, true)
    RETURNING id INTO barba_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Manicure', 'Cuidados completos para as unhas das mãos', 30.00, 40, company_uuid, true)
    RETURNING id INTO manicure_uuid;
    
    -- Inserir agendamentos
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Carla Mendes', 'carla@email.com', '(11) 98765-4321', CURRENT_DATE + INTERVAL '1 day', '09:00:00', corte_fem_uuid, maria_uuid, company_uuid, 'scheduled', 'Cliente prefere corte em camadas');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Roberto Silva', 'roberto@email.com', '(11) 97654-3210', CURRENT_DATE, '14:00:00', corte_masc_uuid, joao_uuid, company_uuid, 'confirmed', 'Corte social para entrevista');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Julia Santos', 'julia@email.com', '(11) 96543-2109', CURRENT_DATE + INTERVAL '2 days', '10:30:00', manicure_uuid, ana_uuid, company_uuid, 'scheduled', 'Primeira vez no salão');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Patricia Oliveira', 'patricia@email.com', '(11) 95432-1098', CURRENT_DATE - INTERVAL '1 day', '16:00:00', coloracao_uuid, maria_uuid, company_uuid, 'completed', 'Coloração loiro');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Fernando Costa', 'fernando@email.com', '(11) 94321-0987', CURRENT_DATE + INTERVAL '3 days', '11:00:00', barba_uuid, joao_uuid, company_uuid, 'scheduled', 'Manutenção da barba');
    
END $$;