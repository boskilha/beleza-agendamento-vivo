-- Adicionar perfil de lojista para a empresa "Spa Relaxamento Total"
INSERT INTO public.company_profiles (
  company_id,
  business_type,
  is_active,
  configuration
) VALUES (
  '40b4e884-c626-417a-8b19-6de7c6c37717'::uuid,
  'marketplace_store'::business_type,
  true,
  '{
    "store_settings": {
      "categories": ["cosmeticos", "produtos_beleza", "acessorios"],
      "delivery_zones": ["local", "nacional"],
      "payment_methods": ["cartao", "pix", "boleto"],
      "commission_rate": 0.15,
      "minimum_order": 50.00,
      "store_description": "Loja online do Spa Relaxamento Total com produtos de beleza e cosméticos selecionados"
    },
    "inventory_management": {
      "auto_update_stock": true,
      "low_stock_alert": 10,
      "track_expiration": true
    },
    "shipping": {
      "free_shipping_minimum": 100.00,
      "processing_days": 2,
      "shipping_zones": {
        "local": 5.00,
        "regional": 15.00,
        "nacional": 25.00
      }
    }
  }'::jsonb
);