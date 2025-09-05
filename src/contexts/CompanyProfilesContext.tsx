// Performance optimized context with better caching and state management
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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

// Stable localStorage key
const STORAGE_KEY = 'selectedProfile';

export const CompanyProfilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<BusinessType | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved as BusinessType | null;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Optimized localStorage sync with debouncing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timeoutId = setTimeout(() => {
      if (activeProfile) {
        localStorage.setItem(STORAGE_KEY, activeProfile);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 100); // Debounce rapid changes

    return () => clearTimeout(timeoutId);
  }, [activeProfile]);

  // Memoized company profiles fetch with proper error handling
  const fetchCompanyProfiles = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .order('created_at');

      if (error) throw error;

      setProfiles(data || []);
      
      const activeProfiles = data?.filter(profile => profile.is_active) || [];
      
      // Validate saved profile
      const savedProfile = typeof window !== 'undefined' 
        ? localStorage.getItem(STORAGE_KEY) as BusinessType | null
        : null;
      const savedProfileExists = savedProfile && activeProfiles.find(p => p.business_type === savedProfile);
      
      if (savedProfileExists) {
        setActiveProfile(savedProfile);
      } else if (activeProfiles.length > 0) {
        const newActiveProfile = activeProfiles[0].business_type as BusinessType;
        setActiveProfile(newActiveProfile);
      } else {
        setActiveProfile(null);
      }
    } catch (error) {
      console.error('Error fetching company profiles:', error);
      toast.error('Erro ao carregar perfis da empresa');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCompanyProfiles();
  }, [fetchCompanyProfiles]);

  // Optimized switch profile with validation
  const switchProfile = useCallback((businessType: BusinessType) => {
    const profile = profiles.find(p => p.business_type === businessType);
    
    if (profile && profile.is_active) {
      setActiveProfile(businessType);
      toast.success(`Perfil alterado para: ${BUSINESS_TYPE_LABELS[businessType]}`);
    } else {
      toast.error('Perfil não disponível');
    }
  }, [profiles]);

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

  // Memoized computed values to prevent unnecessary recalculations
  const value: CompanyProfilesContextType = useMemo(() => ({
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
  }), [
    profiles, 
    activeProfile, 
    isLoading, 
    switchProfile, 
    activateProfile, 
    deactivateProfile
  ]);

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