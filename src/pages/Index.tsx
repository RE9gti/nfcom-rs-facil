import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import EmitirNFCom from "@/components/EmitirNFCom";
import NotasEmitidas from "@/components/NotasEmitidas";
import CertificadoA1 from "@/components/CertificadoA1";
import Configuracao from "@/pages/Configuracao";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "emitir":
        return <EmitirNFCom />;
      case "notas":
        return <NotasEmitidas />;
      case "certificado":
        return <CertificadoA1 />;
      case "configuracoes":
        return <Configuracao />;
      case "ajuda":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ajuda</h2>
            <p className="text-muted-foreground">Documentação e suporte do sistema</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
