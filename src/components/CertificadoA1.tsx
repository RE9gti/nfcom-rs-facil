import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Key,
  FileText
} from "lucide-react";

const CertificadoA1 = () => {
  const certificadoStatus = {
    instalado: true,
    valido: true,
    dataVencimento: "2024-12-31",
    emissor: "AC SERASA RFB v5",
    titular: "EMPRESA EXEMPLO LTDA",
    cnpj: "00.000.000/0001-00"
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Certificado Digital A1</h2>
        <p className="text-muted-foreground">Gerencie seu certificado digital para assinatura das NFCom</p>
      </div>

      {/* Status do Certificado */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${
            certificadoStatus.instalado && certificadoStatus.valido 
              ? 'bg-accent/10' 
              : 'bg-warning/10'
          }`}>
            <Shield className={`h-8 w-8 ${
              certificadoStatus.instalado && certificadoStatus.valido 
                ? 'text-accent' 
                : 'text-warning'
            }`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">Status do Certificado</h3>
              <Badge className={
                certificadoStatus.instalado && certificadoStatus.valido 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-warning text-warning-foreground'
              }>
                {certificadoStatus.instalado && certificadoStatus.valido ? 'Ativo' : 'Atenção'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Certificado instalado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Válido para assinatura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Válido até: {new Date(certificadoStatus.dataVencimento).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p><strong>Titular:</strong> {certificadoStatus.titular}</p>
                <p><strong>CNPJ:</strong> {certificadoStatus.cnpj}</p>
                <p><strong>Emissor:</strong> {certificadoStatus.emissor}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Instalar Novo Certificado */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Instalar Novo Certificado</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="certificado-file">Arquivo do Certificado (.p12 ou .pfx)</Label>
            <Input 
              id="certificado-file" 
              type="file" 
              accept=".p12,.pfx"
              className="cursor-pointer"
            />
          </div>
          
          <div>
            <Label htmlFor="senha-certificado">Senha do Certificado</Label>
            <Input 
              id="senha-certificado" 
              type="password" 
              placeholder="Digite a senha do certificado"
            />
          </div>
          
          <Button className="w-full md:w-auto">
            <Key className="h-4 w-4 mr-2" />
            Instalar Certificado
          </Button>
        </div>
      </Card>

      {/* Informações Importantes */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-warning mb-2">Informações Importantes</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• O certificado A1 é obrigatório para assinatura digital das NFCom</p>
              <p>• Certifique-se de que o certificado está válido e dentro do prazo</p>
              <p>• A senha será armazenada de forma segura e criptografada</p>
              <p>• Renove seu certificado antes do vencimento para evitar interrupções</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Histórico de Certificados */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Histórico de Certificados</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="font-medium">EMPRESA EXEMPLO LTDA</p>
              <p className="text-sm text-muted-foreground">Instalado em 15/01/2024</p>
            </div>
            <div className="text-right">
              <Badge className="bg-accent text-accent-foreground">Ativo</Badge>
              <p className="text-xs text-muted-foreground mt-1">Válido até 31/12/2024</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-border rounded-lg opacity-60">
            <div>
              <p className="font-medium">EMPRESA EXEMPLO LTDA</p>
              <p className="text-sm text-muted-foreground">Expirado em 31/12/2023</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Expirado</Badge>
              <p className="text-xs text-muted-foreground mt-1">Substituído</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CertificadoA1;