const LojistaProdutos = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Meus Produtos</h2>
      <div className="bg-card p-6 rounded-lg border">
        <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
        <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Adicionar Produto
        </button>
      </div>
    </div>
  );
};

export default LojistaProdutos;