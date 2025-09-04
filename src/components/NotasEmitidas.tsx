import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  Calendar,
  DollarSign
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NotasEmitidas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("30dias");

  const notasExample = [
    {
      numero: "000001",
      serie: "001",
      data: "2024-01-15",
      tomador: "Cliente ABC Ltda",
      valor: "R$ 2.500,00",
      status: "Autorizada",
      chave: "43240100000000000001550010000000001123456789"
    },
    {
      numero: "000002",
      serie: "001", 
      data: "2024-01-15",
      tomador: "Empresa XYZ S/A",
      valor: "R$ 1.800,00",
      status: "Pendente",
      chave: "43240100000000000001550010000000002123456789"
    },
    {
      numero: "000003",
      serie: "001",
      data: "2024-01-14",
      tomador: "Comercial 123 ME",
      valor: "R$ 3.200,00",
      status: "Autorizada",
      chave: "43240100000000000001550010000000003123456789"
    },
    {
      numero: "000004",
      serie: "001",
      data: "2024-01-14",
      tomador: "Indústria Beta Ltda",
      valor: "R$ 950,00",
      status: "Cancelada",
      chave: "43240100000000000001550010000000004123456789"
    },
    {
      numero: "000005",
      serie: "001",
      data: "2024-01-13",
      tomador: "Serviços Gamma S/A",
      valor: "R$ 4.100,00",
      status: "Autorizada",
      chave: "43240100000000000001550010000000005123456789"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Autorizada': 
        return 'bg-accent text-accent-foreground';
      case 'Pendente': 
        return 'bg-warning text-warning-foreground';
      case 'Cancelada': 
        return 'bg-destructive text-destructive-foreground';
      case 'Rejeitada':
        return 'bg-destructive text-destructive-foreground';
      default: 
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredNotas = notasExample.filter(nota => {
    const matchesSearch = nota.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nota.tomador.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || nota.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Notas Emitidas</h2>
        <p className="text-muted-foreground">Gerencie e consulte suas notas fiscais de comunicação</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Notas</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold">R$ 125.430</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Calendar className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Este Mês</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Buscar por número ou tomador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="autorizada">Autorizada</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="rejeitada">Rejeitada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <Label>Período</Label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                <SelectItem value="ano">Este ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabela */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tomador</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotas.map((nota) => (
              <TableRow key={nota.numero}>
                <TableCell className="font-medium">
                  <div>
                    <p>{nota.numero}/{nota.serie}</p>
                    <p className="text-xs text-muted-foreground">
                      {nota.chave.substring(0, 8)}...
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(nota.data).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate">
                    {nota.tomador}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{nota.valor}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(nota.status)}>
                    {nota.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredNotas.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma nota encontrada</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou emitir sua primeira NFCom.
          </p>
        </Card>
      )}
    </div>
  );
};

export default NotasEmitidas;