export type CustomerType = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
  };
  
  export type ProductType = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
  };
  
  export type OrderStatus = "placed" | "shipped" | "delivered" | "cancelled";
  
  export type OrderType = {
    id: string;
    customerId: string;
    customer?: CustomerType;
    products: {
      productId: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
  };