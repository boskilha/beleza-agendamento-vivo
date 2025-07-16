import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { month: "Jan", sales: 18000 },
  { month: "Fev", sales: 22000 },
  { month: "Mar", sales: 28000 },
  { month: "Abr", sales: 25000 },
  { month: "Mai", sales: 32000 },
  { month: "Jun", sales: 35000 },
];

const categoryData = [
  { name: "Equipamentos", value: 35, color: "#8B5CF6" },
  { name: "Insumos", value: 30, color: "#EC4899" },
  { name: "Suprimentos", value: 20, color: "#06B6D4" },
  { name: "Outros", value: 15, color: "#10B981" }
];

export function B2BSalesChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vendas B2B Mensais</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Vendas"]} />
            <Area type="monotone" dataKey="sales" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Vendas por Categoria</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Participação"]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {categoryData.map((category) => (
            <div key={category.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}