import { Card } from "@/components/ui/card";
import { 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  DollarSign,
  Loader2
} from "lucide-react";
import { useDashboardStats, useNFComList } from "@/hooks/useNFCom";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentNotes, isLoading: notesLoading } = useNFComList();
  const displayStats = stats ? [
    {
      title: "Notas Emitidas (Mês)",
      value: stats.totalNotas.toString(),
      subtitle: `de ${stats.metaMensal} previstas`,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Valor Total (Mês)",
      value: `R$ ${stats.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: "+12% vs mês anterior",
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Notas Aprovadas",
      value: stats.notasAutorizadas.toString(),
      subtitle: `${stats.totalNotas > 0 ? Math.round((stats.notasAutorizadas / stats.totalNotas) * 100) : 0}% de aprovação`,
      icon: CheckCircle2,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Pendências",
      value: stats.notasPendentes.toString(),
      subtitle: "Aguardando retorno",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ] : [];

  const recentNotesData = recentNotes?.slice(0, 5) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'autorizada': return 'text-accent bg-accent/10';
      case 'pendente': return 'text-warning bg-warning/10';
      case 'cancelada': return 'text-destructive bg-destructive/10';
      case 'rejeitada': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (statsLoading || notesLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral das suas notas fiscais de comunicação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Atividade Recente</h3>
          </div>
          <div className="space-y-4">
            {recentNotesData.length > 0 ? (
              recentNotesData.map((nota, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">NFCom Nº {nota.numero.toString().padStart(6, '0')}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(nota.data_emissao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(nota.status)}`}>
                      {nota.status.charAt(0).toUpperCase() + nota.status.slice(1)}
                    </span>
                    <p className="text-sm font-medium mt-1">
                      R$ {Number(nota.valor_total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">Nenhuma nota emitida ainda</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">Estatísticas do Mês</h3>
          </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Meta Mensal</span>
                <span className="font-medium">{stats?.metaMensal || 50} notas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Emitidas</span>
                <span className="font-medium text-primary">{stats?.totalNotas || 0} notas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Restantes</span>
                <span className="font-medium">{(stats?.metaMensal || 50) - (stats?.totalNotas || 0)} notas</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min(((stats?.totalNotas || 0) / (stats?.metaMensal || 50)) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(((stats?.totalNotas || 0) / (stats?.metaMensal || 50)) * 100)}% da meta atingida
              </p>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;