
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { ProductType } from "../../types/types";
import { formatCurrency } from "../../lib/utils";

interface ProductCardProps {
  product: ProductType;
  onSelect?: () => void;
  selectable?: boolean;
}

const ProductCard = ({ product, onSelect, selectable = false }: ProductCardProps) => {
  return (
    <Card 
      className={`overflow-hidden ${selectable ? "cursor-pointer hover:border-primary transition-colors" : ""}`}
      onClick={selectable ? onSelect : undefined}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="font-bold text-lg">{formatCurrency(product.price)}</div>
        {selectable && (
          <span className="text-xs text-muted-foreground">Click to select</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;