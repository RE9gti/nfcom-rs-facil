import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Tomador {
  id: string;
  tipo_pessoa: 'PF' | 'PJ';
  documento: string;
  nome_razao_social: string;
  endereco: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export const useTomadores = () => {
  return useQuery({
    queryKey: ['tomadores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tomadores')
        .select('*')
        .order('nome_razao_social');

      if (error) {
        throw new Error(error.message);
      }

      return data as Tomador[];
    }
  });
};

export const useCreateTomador = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tomadorData: Omit<Tomador, 'id' | 'created_at' | 'updated_at'> & { user_id: string }) => {
      const { data, error } = await supabase
        .from('tomadores')
        .insert(tomadorData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tomadores'] });
      toast({
        title: "Sucesso!",
        description: "Tomador cadastrado com sucesso."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive"
      });
    }
  });
};