-- Inserir empresa de teste com email único
INSERT INTO public.companies (
  name,
  cnpj,
  email,
  phone,
  address
) VALUES (
  'Studio Beleza & Arte',
  '98765432000100',
  'contato@studiobelezaarte.com.br',
  '(11) 88888-8888',
  'Av. Paulista, 500 - São Paulo, SP'
);

-- Capturar o ID da empresa inserida
DO $$
DECLARE
    company_uuid uuid;
    lucia_uuid uuid;
    carlos_uuid uuid;
    beatriz_uuid uuid;
    corte_fem_uuid uuid;
    corte_masc_uuid uuid;
    design_uuid uuid;
    penteado_uuid uuid;
    depilacao_uuid uuid;
    massagem_uuid uuid;
BEGIN
    -- Buscar ID da empresa inserida
    SELECT id INTO company_uuid FROM public.companies WHERE cnpj = '98765432000100';
    
    -- Inserir funcionários
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('Lúcia Fernandes', 'lucia@studiobelezaarte.com.br', '(11) 99998-8888', ARRAY['Corte', 'Penteado', 'Design de sobrancelha'], company_uuid, true)
    RETURNING id INTO lucia_uuid;
    
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('Carlos Mendes', 'carlos@studiobelezaarte.com.br', '(11) 99997-7777', ARRAY['Corte masculino', 'Barba', 'Relaxamento'], company_uuid, true)
    RETURNING id INTO carlos_uuid;
    
    INSERT INTO public.employees (name, email, phone, specialties, company_id, active) 
    VALUES ('Beatriz Santos', 'beatriz@studiobelezaarte.com.br', '(11) 99996-6666', ARRAY['Depilação', 'Massagem', 'Limpeza de pele'], company_uuid, true)
    RETURNING id INTO beatriz_uuid;
    
    -- Inserir serviços
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Corte + Escova Feminino', 'Corte moderno com escova modeladora', 90.00, 75, company_uuid, true)
    RETURNING id INTO corte_fem_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Corte + Barba Masculino', 'Corte completo com aparar de barba', 45.00, 40, company_uuid, true)
    RETURNING id INTO corte_masc_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Design de Sobrancelha', 'Modelagem completa das sobrancelhas', 35.00, 25, company_uuid, true)
    RETURNING id INTO design_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Penteado para Festa', 'Penteado elaborado para eventos', 120.00, 90, company_uuid, true)
    RETURNING id INTO penteado_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Depilação Pernas', 'Depilação completa das pernas', 60.00, 50, company_uuid, true)
    RETURNING id INTO depilacao_uuid;
    
    INSERT INTO public.services (name, description, price, duration, company_id, active) 
    VALUES ('Massagem Relaxante', 'Massagem corporal para relaxamento', 100.00, 60, company_uuid, true)
    RETURNING id INTO massagem_uuid;
    
    -- Inserir agendamentos
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Amanda Silva', 'amanda@email.com', '(11) 91111-1111', CURRENT_DATE + INTERVAL '1 day', '10:00:00', corte_fem_uuid, lucia_uuid, company_uuid, 'scheduled', 'Quer mudar o visual');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Marcos Oliveira', 'marcos@email.com', '(11) 92222-2222', CURRENT_DATE, '15:30:00', corte_masc_uuid, carlos_uuid, company_uuid, 'confirmed', 'Cliente VIP');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Fernanda Lima', 'fernanda@email.com', '(11) 93333-3333', CURRENT_DATE + INTERVAL '2 days', '14:00:00', design_uuid, lucia_uuid, company_uuid, 'scheduled', 'Primeira vez');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Camila Costa', 'camila@email.com', '(11) 94444-4444', CURRENT_DATE + INTERVAL '5 days', '09:00:00', penteado_uuid, lucia_uuid, company_uuid, 'scheduled', 'Casamento da irmã');
    
    INSERT INTO public.appointments (client_name, client_email, client_phone, appointment_date, appointment_time, service_id, employee_id, company_id, status, notes) 
    VALUES ('Ricardo Santos', 'ricardo@email.com', '(11) 95555-5555', CURRENT_DATE - INTERVAL '2 days', '16:00:00', massagem_uuid, beatriz_uuid, company_uuid, 'completed', 'Muito satisfeito');
    
END $$;