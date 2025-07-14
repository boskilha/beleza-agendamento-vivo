import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Detalhe do Produto</h1>
          <p className="text-muted-foreground">Produto ID: {id}</p>
          <div className="mt-8">
            <p>Página em desenvolvimento...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;