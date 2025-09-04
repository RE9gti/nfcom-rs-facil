import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NFCom {
  id: string;
  numero: number;
  serie: string;
  chave_acesso?: string;
  data_emissao: string;
  data_competencia: string;
  tipo_servico: string;
  codigo_servico: string;
  descricao_servico: string;
  periodo_inicio: string;
  periodo_fim: string;
  quantidade: number;
  valor_servicos: number;
  valor_desconto: number;
  base_calculo_icms: number;
  aliquota_icms: number;
  valor_icms: number;
  valor_total: number;
  status: 'rascunho' | 'pendente' | 'autorizada' | 'cancelada' | 'rejeitada';
  protocolo_autorizacao?: string;
  data_autorizacao?: string;
  motivo_rejeicao?: string;
  created_at: string;
  updated_at: string;
  empresa?: {
    razao_social: string;
    cnpj: string;
  };
  tomador?: {
    nome_razao_social: string;
    documento: string;
  };
}

export interface DashboardStats {
  totalNotas: number;
  notasAutorizadas: number;
  notasPendentes: number;
  valorTotal: number;
  metaMensal: number;
}

export const useNFComList = () => {
  return useQuery({
    queryKey: ['nfcom-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nfcom')
        .select(`
          *,
          empresas:empresa_id(razao_social, cnpj),
          tomadores:tomador_id(nome_razao_social, documento)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data as NFCom[];
    }
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const currentMonth = new Date();
      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      const { data, error } = await supabase
        .from('nfcom')
        .select('status, valor_total')
        .gte('created_at', firstDay.toISOString())
        .lte('created_at', lastDay.toISOString());

      if (error) {
        throw new Error(error.message);
      }

      const stats: DashboardStats = {
        totalNotas: data.length,
        notasAutorizadas: data.filter(n => n.status === 'autorizada').length,
        notasPendentes: data.filter(n => n.status === 'pendente').length,
        valorTotal: data.reduce((sum, n) => sum + Number(n.valor_total), 0),
        metaMensal: 50
      };

      return stats;
    }
  });
};

export const useCreateNFCom = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nfcomData: Omit<NFCom, 'id' | 'created_at' | 'updated_at' | 'empresa' | 'tomador'> & { 
      user_id: string;
      empresa_id: string;
      tomador_id: string;
    }) => {
      const { data, error } = await supabase
        .from('nfcom')
        .insert(nfcomData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfcom-list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: "Sucesso!",
        description: "NFCom salva com sucesso."
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

export const useUpdateNFCom = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<NFCom> & { id: string }) => {
      const { data, error } = await supabase
        .from('nfcom')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nfcom-list'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast({
        title: "Sucesso!",
        description: "NFCom atualizada com sucesso."
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