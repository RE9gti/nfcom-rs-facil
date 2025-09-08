-- Fix database function security vulnerabilities
-- Update proximo_numero_nfcom function with secure search_path
CREATE OR REPLACE FUNCTION public.proximo_numero_nfcom(empresa_uuid uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  ultimo_numero INTEGER;
BEGIN
  SELECT COALESCE(MAX(numero), 0) INTO ultimo_numero 
  FROM public.nfcom 
  WHERE empresa_id = empresa_uuid 
    AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);
  
  RETURN ultimo_numero + 1;
END;
$function$;

-- Update update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Add DELETE policies for data management (optional - users can delete their own records if needed)
-- Note: DELETE is intentionally restricted for audit purposes, but adding policies for flexibility

-- Enable DELETE for empresas (users can delete their own companies)
CREATE POLICY "Usuários podem deletar suas próprias empresas" 
ON public.empresas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable DELETE for tomadores (users can delete their own tomadores)
CREATE POLICY "Usuários podem deletar seus próprios tomadores" 
ON public.tomadores 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable DELETE for certificados_a1 (users can delete their own certificates)
CREATE POLICY "Usuários podem deletar seus próprios certificados" 
ON public.certificados_a1 
FOR DELETE 
USING (auth.uid() = user_id);

-- Note: NFCom records should not be deletable for audit compliance - no DELETE policy added