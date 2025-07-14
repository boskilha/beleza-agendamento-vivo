import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
          <div className="mt-8">
            <p>Página de checkout em desenvolvimento...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;