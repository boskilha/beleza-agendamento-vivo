import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { BusinessType, CompanyProfile } from '@/types/business';
import { toast } from 'sonner';

export const useCompanyProfiles = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<CompanyProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<BusinessType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCompanyProfiles();
    }
  }, [user]);

  const fetchCompanyProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (error) throw error;

      setProfiles(data || []);
      
      // Definir perfil ativo padrão (primeiro disponível)
      if (data && data.length > 0 && !activeProfile) {
        setActiveProfile(data[0].business_type as BusinessType);
      }
    } catch (error) {
      console.error('Erro ao buscar perfis da empresa:', error);
      toast.error('Erro ao carregar perfis da empresa');
    } finally {
      setIsLoading(false);
    }
  };

  const switchProfile = (businessType: BusinessType) => {
    const profile = profiles.find(p => p.business_type === businessType);
    if (profile) {
      setActiveProfile(businessType);
      toast.success(`Perfil alterado para: ${businessType}`);
    }
  };

  const activateProfile = async (businessType: BusinessType) => {
    try {
      // Obter company_id do usuário atual
      const { data: companyData } = await supabase
        .from('company_users')
        .select('company_id')
        .eq('user_id', user?.id)
        .single();

      if (!companyData?.company_id) {
        toast.error('Empresa não encontrada');
        return;
      }

      // Buscar TODOS os perfis (ativos e inativos) para verificar se já existe
      const { data: existingProfiles, error: searchError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('company_id', companyData.company_id)
        .eq('business_type', businessType);

      if (searchError) throw searchError;

      if (existingProfiles && existingProfiles.length > 0) {
        // Se já existe um perfil (mesmo inativo), apenas ativar
        const existingProfile = existingProfiles[0];
        const { error } = await supabase
          .from('company_profiles')
          .update({ is_active: true })
          .eq('id', existingProfile.id);

        if (error) throw error;
      } else {
        // Se não existe nenhum perfil, criar novo
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
  };

  const deactivateProfile = async (businessType: BusinessType) => {
    try {
      const profile = profiles.find(p => p.business_type === businessType);
      if (!profile) return;

      const { error } = await supabase
        .from('company_profiles')
        .update({ is_active: false })
        .eq('id', profile.id);

      if (error) throw error;

      // Se o perfil desativado era o ativo, trocar para outro
      if (activeProfile === businessType) {
        const remainingProfiles = profiles.filter(p => p.business_type !== businessType);
        setActiveProfile(remainingProfiles.length > 0 ? remainingProfiles[0].business_type as BusinessType : null);
      }

      await fetchCompanyProfiles();
      toast.success(`Perfil ${businessType} desativado`);
    } catch (error) {
      console.error('Erro ao desativar perfil:', error);
      toast.error('Erro ao desativar perfil');
    }
  };

  return {
    profiles,
    activeProfile,
    isLoading,
    switchProfile,
    activateProfile,
    deactivateProfile,
    availableTypes: profiles.map(p => p.business_type as BusinessType),
  };
};