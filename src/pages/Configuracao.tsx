import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Settings,
  Plus,
  Edit,
  Trash2,
  User,
  Building
} from 'lucide-react';
import { useEmpresas, useCreateEmpresa } from '@/hooks/useEmpresas';
import { useTomadores, useCreateTomador } from '@/hooks/useTomadores';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Configuracao = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: empresas } = useEmpresas();
  const { data: tomadores } = useTomadores();
  const createEmpresa = useCreateEmpresa();
  const createTomador = useCreateTomador();

  const [showEmpresaForm, setShowEmpresaForm] = useState(false);
  const [showTomadorForm, setShowTomadorForm] = useState(false);

  const [empresaForm, setEmpresaForm] = useState({
    cnpj: '',
    razao_social: '',
    nome_fantasia: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: 'RS',
    cep: '',
    telefone: '',
    email: '',
    inscricao_estadual: '',
    inscricao_municipal: '',
    regime_tributario: 'simples_nacional'
  });

  const [tomadorForm, setTomadorForm] = useState({
    tipo_pessoa: 'PJ' as 'PF' | 'PJ',
    documento: '',
    nome_razao_social: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    telefone: '',
    email: ''
  });

  const handleCreateEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createEmpresa.mutateAsync({
        ...empresaForm,
        user_id: user.id
      });
      setShowEmpresaForm(false);
      setEmpresaForm({
        cnpj: '',
        razao_social: '',
        nome_fantasia: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: 'RS',
        cep: '',
        telefone: '',
        email: '',
        inscricao_estadual: '',
        inscricao_municipal: '',
        regime_tributario: 'simples_nacional'
      });
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
    }
  };

  const handleCreateTomador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createTomador.mutateAsync({
        ...tomadorForm,
        user_id: user.id
      });
      setShowTomadorForm(false);
      setTomadorForm({
        tipo_pessoa: 'PJ',
        documento: '',
        nome_razao_social: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        telefone: '',
        email: ''
      });
    } catch (error) {
      console.error('Erro ao criar tomador:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
        <p className="text-muted-foreground">Gerencie suas empresas, clientes e configurações do sistema</p>
      </div>

      <Tabs defaultValue="empresas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="empresas" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Empresas
          </TabsTrigger>
          <TabsTrigger value="tomadores" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Tomadores
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empresas" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Minhas Empresas</h3>
            <Button onClick={() => setShowEmpresaForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Empresa
            </Button>
          </div>

          {showEmpresaForm && (
            <Card className="p-6">
              <h4 className="text-lg font-medium mb-4">Cadastrar Nova Empresa</h4>
              <form onSubmit={handleCreateEmpresa} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={empresaForm.cnpj}
                      onChange={(e) => setEmpresaForm({ ...empresaForm, cnpj: e.target.value })}
                      placeholder="00.000.000/0001-00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="razao_social">Razão Social *</Label>
                    <Input
                      id="razao_social"
                      value={empresaForm.razao_social}
                      onChange={(e) => setEmpresaForm({ ...empresaForm, razao_social: e.target.value })}
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endereco">Endereço *</Label>
                    <Input
                      id="endereco"
                      value={empresaForm.endereco}
                      onChange={(e) => setEmpresaForm({ ...empresaForm, endereco: e.target.value })}
                      placeholder="Rua, Avenida..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={empresaForm.cidade}
                      onChange={(e) => setEmpresaForm({ ...empresaForm, cidade: e.target.value })}
                      placeholder="Porto Alegre"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createEmpresa.isPending}>
                    {createEmpresa.isPending ? 'Salvando...' : 'Salvar Empresa'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowEmpresaForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {empresas?.map((empresa) => (
              <Card key={empresa.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{empresa.razao_social}</h4>
                      <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
                      <p className="text-xs text-muted-foreground">{empresa.cidade}, {empresa.uf}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {empresas?.length === 0 && (
            <Card className="p-8 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma empresa cadastrada</h3>
              <p className="text-muted-foreground mb-4">
                Cadastre sua primeira empresa para começar a emitir NFCom
              </p>
              <Button onClick={() => setShowEmpresaForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Empresa
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tomadores" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Tomadores de Serviço</h3>
            <Button onClick={() => setShowTomadorForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Tomador
            </Button>
          </div>

          {showTomadorForm && (
            <Card className="p-6">
              <h4 className="text-lg font-medium mb-4">Cadastrar Novo Tomador</h4>
              <form onSubmit={handleCreateTomador} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipo_pessoa">Tipo de Pessoa *</Label>
                    <Select
                      value={tomadorForm.tipo_pessoa}
                      onValueChange={(value: 'PF' | 'PJ') => 
                        setTomadorForm({ ...tomadorForm, tipo_pessoa: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PF">Pessoa Física</SelectItem>
                        <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="documento">{tomadorForm.tipo_pessoa === 'PF' ? 'CPF' : 'CNPJ'} *</Label>
                    <Input
                      id="documento"
                      value={tomadorForm.documento}
                      onChange={(e) => setTomadorForm({ ...tomadorForm, documento: e.target.value })}
                      placeholder={tomadorForm.tipo_pessoa === 'PF' ? '000.000.000-00' : '00.000.000/0001-00'}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nome_razao_social">
                    {tomadorForm.tipo_pessoa === 'PF' ? 'Nome Completo' : 'Razão Social'} *
                  </Label>
                  <Input
                    id="nome_razao_social"
                    value={tomadorForm.nome_razao_social}
                    onChange={(e) => setTomadorForm({ ...tomadorForm, nome_razao_social: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createTomador.isPending}>
                    {createTomador.isPending ? 'Salvando...' : 'Salvar Tomador'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowTomadorForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tomadores?.map((tomador) => (
              <Card key={tomador.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">{tomador.nome_razao_social}</h4>
                      <p className="text-sm text-muted-foreground">{tomador.documento}</p>
                      <Badge variant="secondary" className="text-xs">
                        {tomador.tipo_pessoa === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {tomadores?.length === 0 && (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum tomador cadastrado</h3>
              <p className="text-muted-foreground mb-4">
                Cadastre seus clientes para agilizar a emissão das NFCom
              </p>
              <Button onClick={() => setShowTomadorForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Tomador
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sistema" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Configurações do Sistema</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="meta-mensal">Meta Mensal de NFCom</Label>
                <Input
                  id="meta-mensal"
                  type="number"
                  placeholder="50"
                  className="max-w-xs"
                />
              </div>
              <div>
                <Label>Notificações</Label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Notificar vencimento de certificados</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Notificar quando NFCom for autorizada</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracao;