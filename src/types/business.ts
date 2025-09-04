export type BusinessType = 'beauty_salon' | 'marketplace_store' | 'b2b_supplier';

export interface CompanyProfile {
  id: string;
  company_id: string;
  business_type: BusinessType;
  is_active: boolean;
  configuration: any;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  business_types: BusinessType[];
  // ... outros campos existentes
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  beauty_salon: 'Salão de Beleza',
  marketplace_store: 'Lojista',
  b2b_supplier: 'Fornecedor B2B',
};

export const BUSINESS_TYPE_ICONS: Record<BusinessType, string> = {
  beauty_salon: 'Scissors',
  marketplace_store: 'Store',
  b2b_supplier: 'Factory',
};