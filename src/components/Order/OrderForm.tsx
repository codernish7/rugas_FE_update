import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useData } from "../../context/DataContext";
import { ShoppingCart, X } from "lucide-react";
import { CustomerType, ProductType } from "../../types/types";
import CustomerList from "../Customer/CustomerList";
import ProductList from "../Product/ProductList";
import SearchInput from "../ui/SearchInput";
import { formatCurrency } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";

const OrderForm = () => {
  const { customers, products, addOrder } = useData();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"customer" | "products" | "review">("customer");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Array<{ product: ProductType; quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setStep("products");
    setSearchTerm("");
  };

  const handleSelectProduct = (product: ProductType) => {
    // Check if product is already selected
    const existingIndex = selectedProducts.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingIndex >= 0) {
      // Update quantity if already in cart
      const updated = [...selectedProducts];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1,
      };
      setSelectedProducts(updated);
    } else {
      // Add new product with quantity 1
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts(selectedProducts.filter(item => item.product.id !== productId));
    } else {
      setSelectedProducts(
        selectedProducts.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(item => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCreateOrder = () => {
    if (!selectedCustomer) return;
    
    const newOrder = {
      customerId: selectedCustomer.id,
      products: selectedProducts.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: calculateTotal(),
      status: "placed" as const,
    };

    addOrder(newOrder);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setSelectedProducts([]);
    setStep("customer");
    setSearchTerm("");
  };

  const renderStepContent = () => {
    switch (step) {
      case "customer":
        return (
          <div className="py-4 space-y-4">
            <SearchInput
              placeholder="Search customers..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <CustomerList 
              customers={filteredCustomers} 
              onSelectCustomer={handleSelectCustomer}
              selectable
            />
          </div>
        );
      case "products":
        return (
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">
                Customer: <span className="text-primary">{selectedCustomer?.name}</span>
              </h3>
              <Button variant="outline" size="sm" onClick={() => setStep("customer")}>
                Change
              </Button>
            </div>

            {selectedProducts.length > 0 && (
              <div className="bg-muted p-3 rounded-md">
                <h4 className="font-medium mb-2">Selected Products:</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedProducts.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatCurrency(product.price)} × {quantity}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={quantity.toString()}
                          onValueChange={(value) => handleUpdateQuantity(product.id, parseInt(value))}
                        >
                          <SelectTrigger className="w-16 h-8">
                            <SelectValue placeholder="Qty" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between font-medium">
                  <div>Total:</div>
                  <div>{formatCurrency(calculateTotal())}</div>
                </div>
                <Button 
                  className="w-full mt-3"
                  onClick={() => setStep("review")}
                  disabled={selectedProducts.length === 0}
                >
                  Review Order
                </Button>
              </div>
            )}

            <SearchInput
              placeholder="Search products..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
            <ProductList 
              products={filteredProducts} 
              onSelectProduct={handleSelectProduct}
              selectable
            />
          </div>
        );
      case "review":
        return (
          <div className="py-4 space-y-4">
            <div className="rounded-md border p-4 space-y-4">
              <div>
                <Label className="text-muted-foreground">Customer</Label>
                <div className="font-medium">{selectedCustomer?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedCustomer?.email}</div>
                <div className="text-sm text-muted-foreground">{selectedCustomer?.phone}</div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Shipping Address</Label>
                <div className="text-sm">{selectedCustomer?.address}</div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Order Items</Label>
                <div className="space-y-2 mt-1">
                  {selectedProducts.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <div>
                        {product.name} <span className="text-muted-foreground">× {quantity}</span>
                      </div>
                      <div>{formatCurrency(product.price * quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-medium">
                <div>Total Amount</div>
                <div>{formatCurrency(calculateTotal())}</div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setStep("products")}>
                Back to Products
              </Button>
              <Button onClick={handleCreateOrder}>
                Create Order
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <ShoppingCart size={16} />
          <span>New Order</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "customer" && "Select Customer"}
            {step === "products" && "Add Products"}
            {step === "review" && "Review Order"}
          </DialogTitle>
        </DialogHeader>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;