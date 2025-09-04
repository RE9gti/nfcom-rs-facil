-- Criar tabela de empresas (prestadores de serviço)
CREATE TABLE public.empresas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  cnpj VARCHAR(18) NOT NULL,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  endereco TEXT NOT NULL,
  numero VARCHAR(10),
  complemento VARCHAR(50),
  bairro VARCHAR(50),
  cidade VARCHAR(50) NOT NULL,
  uf VARCHAR(2) NOT NULL DEFAULT 'RS',
  cep VARCHAR(9) NOT NULL,
  telefone VARCHAR(15),
  email VARCHAR(100),
  inscricao_estadual VARCHAR(20),
  inscricao_municipal VARCHAR(20),
  regime_tributario VARCHAR(20) DEFAULT 'simples_nacional',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de tomadores (clientes)
CREATE TABLE public.tomadores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  tipo_pessoa VARCHAR(2) NOT NULL CHECK (tipo_pessoa IN ('PF', 'PJ')),
  documento VARCHAR(18) NOT NULL,
  nome_razao_social TEXT NOT NULL,
  endereco TEXT NOT NULL,
  numero VARCHAR(10),
  complemento VARCHAR(50),
  bairro VARCHAR(50),
  cidade VARCHAR(50) NOT NULL,
  uf VARCHAR(2) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  telefone VARCHAR(15),
  email VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de certificados A1
CREATE TABLE public.certificados_a1 (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  empresa_id UUID REFERENCES public.empresas(id) NOT NULL,
  nome_certificado TEXT NOT NULL,
  emissor TEXT NOT NULL,
  valido_de DATE NOT NULL,
  valido_ate DATE NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  arquivo_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de NFCom
CREATE TABLE public.nfcom (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  empresa_id UUID REFERENCES public.empresas(id) NOT NULL,
  tomador_id UUID REFERENCES public.tomadores(id) NOT NULL,
  certificado_id UUID REFERENCES public.certificados_a1(id),
  
  -- Dados da NFCom
  numero INTEGER NOT NULL,
  serie VARCHAR(3) NOT NULL DEFAULT '001',
  chave_acesso VARCHAR(44),
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_competencia DATE NOT NULL,
  
  -- Dados do serviço
  tipo_servico VARCHAR(50) NOT NULL,
  codigo_servico VARCHAR(10) NOT NULL,
  descricao_servico TEXT NOT NULL,
  periodo_inicio DATE NOT NULL,
  periodo_fim DATE NOT NULL,
  quantidade DECIMAL(10,2) DEFAULT 1.00,
  
  -- Valores
  valor_servicos DECIMAL(15,2) NOT NULL,
  valor_desconto DECIMAL(15,2) DEFAULT 0.00,
  base_calculo_icms DECIMAL(15,2) NOT NULL,
  aliquota_icms DECIMAL(5,2) NOT NULL,
  valor_icms DECIMAL(15,2) NOT NULL,
  valor_total DECIMAL(15,2) NOT NULL,
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'pendente', 'autorizada', 'cancelada', 'rejeitada')),
  protocolo_autorizacao VARCHAR(50),
  data_autorizacao TIMESTAMP WITH TIME ZONE,
  motivo_rejeicao TEXT,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar sequência para numeração das NFCom por empresa
CREATE SEQUENCE nfcom_numero_seq START 1;

-- Criar função para gerar próximo número
CREATE OR REPLACE FUNCTION public.proximo_numero_nfcom(empresa_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  ultimo_numero INTEGER;
BEGIN
  SELECT COALESCE(MAX(numero), 0) INTO ultimo_numero 
  FROM public.nfcom 
  WHERE empresa_id = empresa_uuid 
    AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);
  
  RETURN ultimo_numero + 1;
END;
$$ LANGUAGE plpgsql;

-- Habilitar RLS
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tomadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificados_a1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nfcom ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para empresas
CREATE POLICY "Usuários podem ver suas próprias empresas" 
ON public.empresas FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias empresas" 
ON public.empresas FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias empresas" 
ON public.empresas FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para tomadores
CREATE POLICY "Usuários podem ver seus próprios tomadores" 
ON public.tomadores FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios tomadores" 
ON public.tomadores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios tomadores" 
ON public.tomadores FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para certificados
CREATE POLICY "Usuários podem ver seus próprios certificados" 
ON public.certificados_a1 FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios certificados" 
ON public.certificados_a1 FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios certificados" 
ON public.certificados_a1 FOR UPDATE USING (auth.uid() = user_id);

-- Políticas RLS para NFCom
CREATE POLICY "Usuários podem ver suas próprias NFCom" 
ON public.nfcom FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias NFCom" 
ON public.nfcom FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias NFCom" 
ON public.nfcom FOR UPDATE USING (auth.uid() = user_id);

-- Triggers para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_empresas_updated_at
  BEFORE UPDATE ON public.empresas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tomadores_updated_at
  BEFORE UPDATE ON public.tomadores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_certificados_updated_at
  BEFORE UPDATE ON public.certificados_a1
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nfcom_updated_at
  BEFORE UPDATE ON public.nfcom
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_empresas_user_id ON public.empresas(user_id);
CREATE INDEX idx_empresas_cnpj ON public.empresas(cnpj);
CREATE INDEX idx_tomadores_user_id ON public.tomadores(user_id);
CREATE INDEX idx_tomadores_documento ON public.tomadores(documento);
CREATE INDEX idx_certificados_user_id ON public.certificados_a1(user_id);
CREATE INDEX idx_certificados_empresa_id ON public.certificados_a1(empresa_id);
CREATE INDEX idx_nfcom_user_id ON public.nfcom(user_id);
CREATE INDEX idx_nfcom_empresa_id ON public.nfcom(empresa_id);
CREATE INDEX idx_nfcom_status ON public.nfcom(status);
CREATE INDEX idx_nfcom_data_emissao ON public.nfcom(data_emissao);