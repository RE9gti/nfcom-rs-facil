import { Card } from "@/components/ui/card";
import { 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Notas Emitidas (Mês)",
      value: "42",
      subtitle: "de 50 previstas",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Valor Total (Mês)",
      value: "R$ 125.430,00",
      subtitle: "+12% vs mês anterior",
      icon: DollarSign,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Notas Aprovadas",
      value: "38",
      subtitle: "90% de aprovação",
      icon: CheckCircle2,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Pendências",
      value: "4",
      subtitle: "Aguardando retorno",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const recentNotes = [
    { numero: "000001", data: "2024-01-15", status: "Autorizada", valor: "R$ 2.500,00" },
    { numero: "000002", data: "2024-01-15", status: "Pendente", valor: "R$ 1.800,00" },
    { numero: "000003", data: "2024-01-14", status: "Autorizada", valor: "R$ 3.200,00" },
    { numero: "000004", data: "2024-01-14", status: "Cancelada", valor: "R$ 950,00" },
    { numero: "000005", data: "2024-01-13", status: "Autorizada", valor: "R$ 4.100,00" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Autorizada': return 'text-accent bg-accent/10';
      case 'Pendente': return 'text-warning bg-warning/10';
      case 'Cancelada': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral das suas notas fiscais de comunicação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
            {recentNotes.map((nota, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                <div>
                  <p className="font-medium text-sm">NFCom Nº {nota.numero}</p>
                  <p className="text-xs text-muted-foreground">{nota.data}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(nota.status)}`}>
                    {nota.status}
                  </span>
                  <p className="text-sm font-medium mt-1">{nota.valor}</p>
                </div>
              </div>
            ))}
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
              <span className="font-medium">50 notas</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Emitidas</span>
              <span className="font-medium text-primary">42 notas</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Restantes</span>
              <span className="font-medium">8 notas</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">84% da meta atingida</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;