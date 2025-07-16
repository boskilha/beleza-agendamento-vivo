import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { name: "Jan", vendas: 4000 },
  { name: "Fev", vendas: 3000 },
  { name: "Mar", vendas: 5000 },
  { name: "Abr", vendas: 4500 },
  { name: "Mai", vendas: 6000 },
  { name: "Jun", vendas: 5500 },
];

const categoryData = [
  { name: "Eletrônicos", value: 35, color: "hsl(var(--primary))" },
  { name: "Roupas", value: 25, color: "hsl(var(--secondary))" },
  { name: "Casa", value: 20, color: "hsl(var(--accent))" },
  { name: "Esportes", value: 15, color: "hsl(var(--muted))" },
  { name: "Outros", value: 5, color: "hsl(var(--border))" },
];

export function SalesChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Vendas por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-muted-foreground" />
              <YAxis className="text-muted-foreground" />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Produtos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}