-- Associar o usuário fabricio.coutinho@yahoo.com.br à empresa Spa Relaxamento Total
INSERT INTO public.company_users (
  user_id, 
  company_id, 
  role, 
  profile_permissions
) VALUES (
  'c3f9a155-455a-408c-aaa1-3a33384cc39c', -- ID do usuário fabricio.coutinho@yahoo.com.br
  '40b4e884-c626-417a-8b19-6de7c6c37717', -- ID da empresa Spa Relaxamento Total
  'owner', -- Proprietário da empresa
  '{"beauty_salon": {"manage_appointments": true, "manage_services": true, "manage_employees": true, "view_analytics": true}}'::jsonb
);

-- Verificar se a empresa já tem um perfil ativo, se não tiver, criar
INSERT INTO public.company_profiles (
  company_id,
  business_type,
  is_active,
  configuration
) 
SELECT 
  '40b4e884-c626-417a-8b19-6de7c6c37717',
  'beauty_salon'::business_type,
  true,
  '{
    "salon_settings": {
      "working_hours": {
        "monday": {"open": "09:00", "close": "18:00"},
        "tuesday": {"open": "09:00", "close": "18:00"},
        "wednesday": {"open": "09:00", "close": "18:00"},
        "thursday": {"open": "09:00", "close": "18:00"},
        "friday": {"open": "09:00", "close": "18:00"},
        "saturday": {"open": "09:00", "close": "16:00"},
        "sunday": {"closed": true}
      },
      "booking_settings": {
        "advance_booking_days": 30,
        "min_booking_notice_hours": 2,
        "allow_online_booking": true
      }
    }
  }'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM public.company_profiles 
  WHERE company_id = '40b4e884-c626-417a-8b19-6de7c6c37717' 
  AND business_type = 'beauty_salon'
);