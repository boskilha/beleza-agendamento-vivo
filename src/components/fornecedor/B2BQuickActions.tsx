import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, FileText, Users } from "lucide-react";

export function B2BQuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Adicionar Produto",
      description: "Incluir novo item no catálogo B2B",
      icon: <Package className="h-5 w-5" />,
      onClick: () => navigate("/fornecedor/catalogo"),
      variant: "default" as const,
    },
    {
      title: "Ver Pedidos",
      description: "Verificar pedidos de lojistas",
      icon: <ShoppingCart className="h-5 w-5" />,
      onClick: () => navigate("/fornecedor/pedidos"),
      variant: "outline" as const,
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios de vendas",
      icon: <FileText className="h-5 w-5" />,
      onClick: () => navigate("/fornecedor/dashboard"),
      variant: "outline" as const,
    },
    {
      title: "Gerenciar Lojistas",
      description: "Administrar clientes B2B",
      icon: <Users className="h-5 w-5" />,
      onClick: () => navigate("/fornecedor/clientes"),
      variant: "outline" as const,
    },
  ];

  return (
    <Card className="p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant={action.variant}
            onClick={action.onClick}
            className="h-auto p-4 flex flex-col items-start gap-2 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2">
              {action.icon}
              <span className="font-medium">{action.title}</span>
            </div>
            <span className="text-sm text-muted-foreground text-left">
              {action.description}
            </span>
          </Button>
        ))}
      </div>
    </Card>
  );
}