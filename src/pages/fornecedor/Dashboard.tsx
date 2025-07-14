const FornecedorDashboard = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium text-card-foreground">Pedidos B2B</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium text-card-foreground">Produtos no Catálogo</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-medium text-card-foreground">Faturamento</h3>
          <p className="text-2xl font-bold text-primary">R$ 0,00</p>
        </div>
      </div>
    </div>
  );
};

export default FornecedorDashboard;