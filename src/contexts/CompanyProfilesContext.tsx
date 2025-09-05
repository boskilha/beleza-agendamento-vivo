import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BusinessType, CompanyProfile, BUSINESS_TYPE_LABELS } from '@/types/business';
import { toast } from 'sonner';

interface CompanyProfilesContextType {
  profiles: CompanyProfile[];
  activeProfile: BusinessType | null;
  isLoading: boolean;
  switchProfile: (businessType: BusinessType) => void;
  activateProfile: (businessType: BusinessType) => Promise<void>;
  deactivateProfile: (businessType: BusinessType) => Promise<void>;
  availableTypes: BusinessType[];
  allProfileTypes: BusinessType[];
  hasProfiles: boolean;
  inactiveProfilesCount: number;
}

const CompanyProfilesContext = createContext<CompanyProfilesContextType | undefined>(undefined);

export const CompanyProfilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<BusinessType | null>(() => {
    // Tentar carregar do localStorage primeiro
    const saved = localStorage.getItem('selectedProfile');
    return saved as BusinessType | null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Salvar no localStorage sempre que activeProfile mudar
  useEffect(() => {
    if (activeProfile) {
      localStorage.setItem('selectedProfile', activeProfile);
      console.log('💾 Perfil salvo no localStorage:', activeProfile);
    } else {
      localStorage.removeItem('selectedProfile');
      console.log('💾 Perfil removido do localStorage');
    }
  }, [activeProfile]);

  const fetchCompanyProfiles = useCallback(async () => {
    if (!user) return;
    
    try {
      console.log('📦 [CONTEXT] fetchCompanyProfiles iniciado');
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .order('created_at');

      if (error) throw error;

      console.log('📦 [CONTEXT] Perfis carregados:', data);
      setProfiles(data || []);
      
      const activeProfiles = data?.filter(profile => profile.is_active) || [];
      console.log('📦 [CONTEXT] Perfis ativos encontrados:', activeProfiles);
      
      // Verificar se o perfil salvo ainda está ativo
      const savedProfile = localStorage.getItem('selectedProfile') as BusinessType | null;
      const savedProfileExists = savedProfile && activeProfiles.find(p => p.business_type === savedProfile);
      
      if (savedProfileExists) {
        console.log('📦 [CONTEXT] Restaurando perfil salvo:', savedProfile);
        setActiveProfile(savedProfile);
      } else if (activeProfiles.length > 0) {
        const newActiveProfile = activeProfiles[0].business_type as BusinessType;
        console.log('📦 [CONTEXT] Definindo perfil ativo inicial:', newActiveProfile);
        setActiveProfile(newActiveProfile);
      } else {
        console.log('📦 [CONTEXT] Nenhum perfil ativo, limpando activeProfile');
        setActiveProfile(null);
      }
    } catch (error) {
      console.error('❌ [CONTEXT] Erro ao buscar perfis da empresa:', error);
      toast.error('Erro ao carregar perfis da empresa');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCompanyProfiles();
  }, [fetchCompanyProfiles]);

  const switchProfile = useCallback((businessType: BusinessType) => {
    console.log('🔄 [CONTEXT] switchProfile chamado para:', businessType);
    console.log('🔄 [CONTEXT] activeProfile antes da troca:', activeProfile);
    
    const profile = profiles.find(p => p.business_type === businessType);
    console.log('🔍 [CONTEXT] Perfil encontrado:', profile);
    
    if (profile && profile.is_active) {
      console.log('✅ [CONTEXT] Mudando perfil ativo de', activeProfile, 'para', businessType);
      setActiveProfile(businessType);
      toast.success(`Perfil alterado para: ${BUSINESS_TYPE_LABELS[businessType]}`);
    } else {
      console.log('❌ [CONTEXT] Perfil não encontrado ou inativo:', profile);
      toast.error('Perfil não disponível');
    }
  }, [profiles, activeProfile]);

  const activateProfile = useCallback(async (businessType: BusinessType) => {
    try {
      const { data: companyData } = await supabase
        .from('company_users')
        .select('company_id')
        .eq('user_id', user?.id)
        .single();

      if (!companyData?.company_id) {
        toast.error('Empresa não encontrada');
        return;
      }

      const { data: existingProfiles, error: searchError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('company_id', companyData.company_id)
        .eq('business_type', businessType);

      if (searchError) throw searchError;

      if (existingProfiles && existingProfiles.length > 0) {
        const existingProfile = existingProfiles[0];
        const { error } = await supabase
          .from('company_profiles')
          .update({ is_active: true })
          .eq('id', existingProfile.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('company_profiles')
          .insert({
            company_id: companyData.company_id,
            business_type: businessType,
            is_active: true,
            configuration: {},
          });

        if (error) throw error;
      }

      await fetchCompanyProfiles();
      toast.success(`Perfil ${businessType} ativado com sucesso`);
    } catch (error) {
      console.error('Erro ao ativar perfil:', error);
      toast.error('Erro ao ativar perfil');
    }
  }, [user, fetchCompanyProfiles]);

  const deactivateProfile = useCallback(async (businessType: BusinessType) => {
    try {
      const profile = profiles.find(p => p.business_type === businessType);
      if (!profile) return;

      const { error } = await supabase
        .from('company_profiles')
        .update({ is_active: false })
        .eq('id', profile.id);

      if (error) throw error;

      if (activeProfile === businessType) {
        const remainingProfiles = profiles.filter(p => p.business_type !== businessType && p.is_active);
        setActiveProfile(remainingProfiles.length > 0 ? remainingProfiles[0].business_type as BusinessType : null);
      }

      await fetchCompanyProfiles();
      toast.success(`Perfil ${businessType} desativado`);
    } catch (error) {
      console.error('Erro ao desativar perfil:', error);
      toast.error('Erro ao desativar perfil');
    }
  }, [profiles, activeProfile, fetchCompanyProfiles]);

  const value: CompanyProfilesContextType = {
    profiles,
    activeProfile,
    isLoading,
    switchProfile,
    activateProfile,
    deactivateProfile,
    availableTypes: profiles.filter(p => p.is_active).map(p => p.business_type as BusinessType),
    allProfileTypes: profiles.map(p => p.business_type as BusinessType),
    hasProfiles: profiles.length > 0,
    inactiveProfilesCount: profiles.filter(p => !p.is_active).length,
  };

  return (
    <CompanyProfilesContext.Provider value={value}>
      {children}
    </CompanyProfilesContext.Provider>
  );
};

export const useCompanyProfiles = () => {
  const context = useContext(CompanyProfilesContext);
  if (context === undefined) {
    throw new Error('useCompanyProfiles deve ser usado dentro de um CompanyProfilesProvider');
  }
  return context;
};