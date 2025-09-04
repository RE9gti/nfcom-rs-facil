import { 
  Home, 
  FileText, 
  Plus, 
  List, 
  Settings, 
  HelpCircle,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'emitir', label: 'Emitir NFCom', icon: Plus },
    { id: 'notas', label: 'Notas Emitidas', icon: List },
    { id: 'certificado', label: 'Certificado A1', icon: Shield },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
    { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeTab === item.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;