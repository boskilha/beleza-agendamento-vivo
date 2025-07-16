import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingCart, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Adicionar Produto",
      description: "Cadastrar novo produto no catálogo",
      icon: <Plus className="h-5 w-5" />,
      onClick: () => navigate("/lojista/produtos?action=new"),
      variant: "default" as const
    },
    {
      title: "Ver Pedidos",
      description: "Gerenciar pedidos pendentes",
      icon: <ShoppingCart className="h-5 w-5" />,
      onClick: () => navigate("/lojista/pedidos"),
      variant: "outline" as const
    },
    {
      title: "Estoque",
      description: "Verificar produtos em baixa",
      icon: <Package className="h-5 w-5" />,
      onClick: () => navigate("/lojista/produtos?filter=baixo-estoque"),
      variant: "outline" as const
    },
    {
      title: "Relatórios",
      description: "Visualizar métricas detalhadas",
      icon: <FileText className="h-5 w-5" />,
      onClick: () => {},
      variant: "outline" as const
    }
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-purple-700 rounded-t-xl">
        <CardTitle className="text-white">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="grid gap-3 sm:grid-cols-2 pt-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 justify-start border-purple-200 hover:bg-purple-50"
              onClick={action.onClick}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-purple-600">
                  {action.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-purple-800">{action.title}</div>
                  <div className="text-xs text-purple-600">
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}