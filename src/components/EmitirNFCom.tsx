import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmitirNFCom = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const steps = [
    { id: 1, title: "Dados do Prestador", description: "Informações da empresa emissora" },
    { id: 2, title: "Dados do Tomador", description: "Informações do cliente/tomador" },
    { id: 3, title: "Dados do Serviço", description: "Detalhes do serviço de comunicação" },
    { id: 4, title: "Valores e Impostos", description: "Cálculos fiscais e tributários" },
    { id: 5, title: "Revisão e Emissão", description: "Conferir dados e emitir" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "NFCom Emitida com Sucesso!",
      description: "A nota fiscal será processada pela SEFAZ-RS em alguns minutos.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cnpj-prestador">CNPJ *</Label>
                <Input id="cnpj-prestador" placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <Label htmlFor="razao-social">Razão Social *</Label>
                <Input id="razao-social" placeholder="Nome da empresa" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endereco">Endereço *</Label>
                <Input id="endereco" placeholder="Logradouro, número" />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input id="cidade" placeholder="Porto Alegre" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input id="cep" placeholder="00000-000" />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" placeholder="(51) 0000-0000" />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="empresa@email.com" />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo-tomador">Tipo de Pessoa *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pf">Pessoa Física</SelectItem>
                    <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="documento-tomador">CPF/CNPJ *</Label>
                <Input id="documento-tomador" placeholder="000.000.000-00" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome-tomador">Nome/Razão Social *</Label>
                <Input id="nome-tomador" placeholder="Nome do cliente" />
              </div>
              <div>
                <Label htmlFor="endereco-tomador">Endereço *</Label>
                <Input id="endereco-tomador" placeholder="Endereço completo" />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo-servico">Tipo de Serviço *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telefonia">Telefonia Fixa</SelectItem>
                    <SelectItem value="movel">Telefonia Móvel</SelectItem>
                    <SelectItem value="internet">Internet</SelectItem>
                    <SelectItem value="tv">TV por Assinatura</SelectItem>
                    <SelectItem value="dados">Comunicação de Dados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="codigo-servico">Código do Serviço *</Label>
                <Input id="codigo-servico" placeholder="Ex: 5901" />
              </div>
            </div>
            <div>
              <Label htmlFor="descricao-servico">Descrição do Serviço *</Label>
              <Textarea 
                id="descricao-servico" 
                placeholder="Descreva detalhadamente o serviço prestado"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="periodo-inicio">Período - Início *</Label>
                <Input id="periodo-inicio" type="date" />
              </div>
              <div>
                <Label htmlFor="periodo-fim">Período - Fim *</Label>
                <Input id="periodo-fim" type="date" />
              </div>
              <div>
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" type="number" placeholder="1" />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valor-servico">Valor do Serviço *</Label>
                <Input id="valor-servico" placeholder="R$ 0,00" />
              </div>
              <div>
                <Label htmlFor="desconto">Desconto</Label>
                <Input id="desconto" placeholder="R$ 0,00" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="aliquota-icms">Alíquota ICMS (%)</Label>
                <Input id="aliquota-icms" placeholder="17,00" />
              </div>
              <div>
                <Label htmlFor="valor-icms">Valor ICMS</Label>
                <Input id="valor-icms" placeholder="R$ 0,00" disabled />
              </div>
              <div>
                <Label htmlFor="valor-total">Valor Total</Label>
                <Input id="valor-total" placeholder="R$ 0,00" disabled />
              </div>
            </div>
            <Card className="p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Resumo dos Valores</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Valor dos Serviços:</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between">
                  <span>(-) Descontos:</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Base de Cálculo ICMS:</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between">
                  <span>ICMS:</span>
                  <span>R$ 0,00</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Valor Total:</span>
                  <span>R$ 0,00</span>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h4 className="font-medium mb-3">Resumo da NFCom</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Prestador:</strong> Empresa Exemplo LTDA</p>
                  <p><strong>CNPJ:</strong> 00.000.000/0001-00</p>
                  <p><strong>Tomador:</strong> Cliente Exemplo</p>
                  <p><strong>Documento:</strong> 000.000.000-00</p>
                </div>
                <div>
                  <p><strong>Serviço:</strong> Internet Banda Larga</p>
                  <p><strong>Período:</strong> 01/01/2024 a 31/01/2024</p>
                  <p><strong>Valor Total:</strong> R$ 150,00</p>
                  <p><strong>ICMS:</strong> R$ 25,50</p>
                </div>
              </div>
            </Card>
            
            <div className="flex items-center gap-2 p-4 border border-warning bg-warning/10 rounded-lg">
              <FileText className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-warning">Certificado A1 Necessário</p>
                <p className="text-sm text-muted-foreground">
                  Para emitir a NFCom, é necessário ter um certificado A1 configurado.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Emitir NFCom</h2>
        <p className="text-muted-foreground">Preencha os dados para emissão da Nota Fiscal de Comunicação</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= step.id 
                ? 'bg-primary border-primary text-primary-foreground' 
                : 'border-muted-foreground text-muted-foreground'
            }`}>
              {step.id}
            </div>
            <div className="ml-2 hidden md:block">
              <p className={`text-sm font-medium ${
                currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px mx-4 ${
                currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{steps[currentStep - 1].title}</h3>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>
        
        {renderStepContent()}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Salvar Rascunho
          </Button>
          
          {currentStep === steps.length ? (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-hover">
              <FileText className="h-4 w-4 mr-2" />
              Emitir NFCom
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Próximo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmitirNFCom;