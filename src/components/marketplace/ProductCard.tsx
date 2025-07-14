
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  rating: number;
  distance?: number;
  description: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      seller: product.seller,
      category: product.category,
    }));
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 group">
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-purple-800 text-white">
          {product.category}
        </Badge>
      </div>
      
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg font-medium line-clamp-2">{product.name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{product.seller}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-purple-800">
            R$ {product.price.toFixed(2)}
          </span>
          {product.distance && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {product.distance}km
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="pt-2 gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/produtos/${product.id}`}>Ver detalhes</Link>
        </Button>
        <Button 
          onClick={handleAddToCart}
          className="bg-purple-800 hover:bg-purple-900"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
