
import { ProductType } from "../../types/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: ProductType[];
  onSelectProduct?: (product: ProductType) => void;
  selectable?: boolean;
}

const ProductList = ({ 
  products, 
  onSelectProduct, 
  selectable = false 
}: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No products found
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => selectable && onSelectProduct && onSelectProduct(product)}
            selectable={selectable}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;