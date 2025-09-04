export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      certificados_a1: {
        Row: {
          arquivo_path: string | null
          ativo: boolean
          created_at: string
          emissor: string
          empresa_id: string
          id: string
          nome_certificado: string
          updated_at: string
          user_id: string
          valido_ate: string
          valido_de: string
        }
        Insert: {
          arquivo_path?: string | null
          ativo?: boolean
          created_at?: string
          emissor: string
          empresa_id: string
          id?: string
          nome_certificado: string
          updated_at?: string
          user_id: string
          valido_ate: string
          valido_de: string
        }
        Update: {
          arquivo_path?: string | null
          ativo?: boolean
          created_at?: string
          emissor?: string
          empresa_id?: string
          id?: string
          nome_certificado?: string
          updated_at?: string
          user_id?: string
          valido_ate?: string
          valido_de?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificados_a1_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          bairro: string | null
          cep: string
          cidade: string
          cnpj: string
          complemento: string | null
          created_at: string
          email: string | null
          endereco: string
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          nome_fantasia: string | null
          numero: string | null
          razao_social: string
          regime_tributario: string | null
          telefone: string | null
          uf: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bairro?: string | null
          cep: string
          cidade: string
          cnpj: string
          complemento?: string | null
          created_at?: string
          email?: string | null
          endereco: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          razao_social: string
          regime_tributario?: string | null
          telefone?: string | null
          uf?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bairro?: string | null
          cep?: string
          cidade?: string
          cnpj?: string
          complemento?: string | null
          created_at?: string
          email?: string | null
          endereco?: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          nome_fantasia?: string | null
          numero?: string | null
          razao_social?: string
          regime_tributario?: string | null
          telefone?: string | null
          uf?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nfcom: {
        Row: {
          aliquota_icms: number
          base_calculo_icms: number
          certificado_id: string | null
          chave_acesso: string | null
          codigo_servico: string
          created_at: string
          data_autorizacao: string | null
          data_competencia: string
          data_emissao: string
          descricao_servico: string
          empresa_id: string
          id: string
          motivo_rejeicao: string | null
          numero: number
          periodo_fim: string
          periodo_inicio: string
          protocolo_autorizacao: string | null
          quantidade: number | null
          serie: string
          status: string
          tipo_servico: string
          tomador_id: string
          updated_at: string
          user_id: string
          valor_desconto: number | null
          valor_icms: number
          valor_servicos: number
          valor_total: number
        }
        Insert: {
          aliquota_icms: number
          base_calculo_icms: number
          certificado_id?: string | null
          chave_acesso?: string | null
          codigo_servico: string
          created_at?: string
          data_autorizacao?: string | null
          data_competencia: string
          data_emissao?: string
          descricao_servico: string
          empresa_id: string
          id?: string
          motivo_rejeicao?: string | null
          numero: number
          periodo_fim: string
          periodo_inicio: string
          protocolo_autorizacao?: string | null
          quantidade?: number | null
          serie?: string
          status?: string
          tipo_servico: string
          tomador_id: string
          updated_at?: string
          user_id: string
          valor_desconto?: number | null
          valor_icms: number
          valor_servicos: number
          valor_total: number
        }
        Update: {
          aliquota_icms?: number
          base_calculo_icms?: number
          certificado_id?: string | null
          chave_acesso?: string | null
          codigo_servico?: string
          created_at?: string
          data_autorizacao?: string | null
          data_competencia?: string
          data_emissao?: string
          descricao_servico?: string
          empresa_id?: string
          id?: string
          motivo_rejeicao?: string | null
          numero?: number
          periodo_fim?: string
          periodo_inicio?: string
          protocolo_autorizacao?: string | null
          quantidade?: number | null
          serie?: string
          status?: string
          tipo_servico?: string
          tomador_id?: string
          updated_at?: string
          user_id?: string
          valor_desconto?: number | null
          valor_icms?: number
          valor_servicos?: number
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "nfcom_certificado_id_fkey"
            columns: ["certificado_id"]
            isOneToOne: false
            referencedRelation: "certificados_a1"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfcom_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfcom_tomador_id_fkey"
            columns: ["tomador_id"]
            isOneToOne: false
            referencedRelation: "tomadores"
            referencedColumns: ["id"]
          },
        ]
      }
      tomadores: {
        Row: {
          bairro: string | null
          cep: string
          cidade: string
          complemento: string | null
          created_at: string
          documento: string
          email: string | null
          endereco: string
          id: string
          nome_razao_social: string
          numero: string | null
          telefone: string | null
          tipo_pessoa: string
          uf: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bairro?: string | null
          cep: string
          cidade: string
          complemento?: string | null
          created_at?: string
          documento: string
          email?: string | null
          endereco: string
          id?: string
          nome_razao_social: string
          numero?: string | null
          telefone?: string | null
          tipo_pessoa: string
          uf: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bairro?: string | null
          cep?: string
          cidade?: string
          complemento?: string | null
          created_at?: string
          documento?: string
          email?: string | null
          endereco?: string
          id?: string
          nome_razao_social?: string
          numero?: string | null
          telefone?: string | null
          tipo_pessoa?: string
          uf?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      proximo_numero_nfcom: {
        Args: { empresa_uuid: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
