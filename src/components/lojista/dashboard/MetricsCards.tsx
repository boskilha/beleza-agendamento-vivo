import React from "react";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const metricCards = [
  {
    title: "Vendas do Mês",
    value: "R$ 12.450",
    icon: <DollarSign className="h-8 w-8 text-white" />,
    info: "+12.5% vs mês anterior",
    bg: "from-green-500 to-green-700"
  },
  {
    title: "Produtos Ativos",
    value: "48",
    icon: <Package className="h-8 w-8 text-white" />,
    info: "+3 novos esta semana",
    bg: "from-blue-500 to-blue-700"
  },
  {
    title: "Pedidos Pendentes",
    value: "12",
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    info: "2 urgentes",
    bg: "from-orange-500 to-orange-700"
  },
  {
    title: "Clientes Ativos",
    value: "284",
    icon: <Users className="h-8 w-8 text-white" />,
    info: "+8.2% este mês",
    bg: "from-purple-500 to-purple-700"
  }
];

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {metricCards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl shadow-lg p-3 flex flex-col justify-between bg-gradient-to-br ${card.bg} transition-transform hover:scale-105 min-h-[110px]`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-medium text-white">{card.title}</span>
            {React.cloneElement(card.icon, { className: "h-6 w-6 text-white" })}
          </div>
          <div className="text-xl font-bold text-white mb-1">{card.value}</div>
          <p className="text-xs text-purple-100">{card.info}</p>
        </div>
      ))}
    </div>
  );
}