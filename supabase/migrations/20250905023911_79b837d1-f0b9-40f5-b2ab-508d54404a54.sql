-- Create portal_super_admins table for super admin access control
CREATE TABLE public.portal_super_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.portal_super_admins ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is portal super admin
CREATE OR REPLACE FUNCTION public.is_portal_super_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.portal_super_admins 
    WHERE user_id = user_uuid AND is_active = true
  );
$$;

-- RLS policies for portal_super_admins
CREATE POLICY "Only super admins can view super admins" 
ON public.portal_super_admins 
FOR SELECT 
USING (is_portal_super_admin());

CREATE POLICY "Only super admins can manage super admins" 
ON public.portal_super_admins 
FOR ALL 
USING (is_portal_super_admin());

-- Create audit log table for super admin actions
CREATE TABLE public.super_admin_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.super_admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only super admins can view audit logs" 
ON public.super_admin_audit_logs 
FOR SELECT 
USING (is_portal_super_admin());

-- Create trigger for audit logging
CREATE OR REPLACE FUNCTION public.log_super_admin_action()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF is_portal_super_admin() THEN
    INSERT INTO public.super_admin_audit_logs (
      admin_user_id, 
      action, 
      entity_type, 
      entity_id, 
      details
    ) VALUES (
      auth.uid(),
      TG_OP,
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      to_jsonb(COALESCE(NEW, OLD))
    );
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;