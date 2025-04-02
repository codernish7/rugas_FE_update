import  { createContext, useContext, useState, ReactNode } from "react";
import { CustomerType, OrderType, ProductType } from "../types/types";
import { customers as initialCustomers, products as initialProducts, orders as initialOrders } from "../data/mockData";
import { toast } from "sonner";

interface DataContextType {
  customers: CustomerType[];
  products: ProductType[];
  orders: OrderType[];
  addCustomer: (customer: Omit<CustomerType, "id" | "createdAt">) => void;
  addOrder: (order: Omit<OrderType, "id" | "createdAt" | "updatedAt">) => void;
  updateOrderStatus: (orderId: string, status: OrderType["status"]) => void;
  getCustomerById: (id: string) => CustomerType | undefined;
  getProductById: (id: string) => ProductType | undefined;
  getOrderById: (id: string) => OrderType | undefined;
  getOrdersByCustomerId: (customerId: string) => OrderType[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);
  const [products] = useState<ProductType[]>(initialProducts);
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);

  const addCustomer = (customerData: Omit<CustomerType, "id" | "createdAt">) => {
    const newCustomer: CustomerType = {
      ...customerData,
      id: `cust-${customers.length + 1}`,
      createdAt: new Date(),
    };
    setCustomers([...customers, newCustomer]);
    toast.success("Customer added successfully");
    return newCustomer;
  };

  const addOrder = (orderData: Omit<OrderType, "id" | "createdAt" | "updatedAt">) => {
    const newOrder: OrderType = {
      ...orderData,
      id: `ord-${orders.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders([...orders, newOrder]);
    toast.success("Order created successfully");
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderType["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
    
    const statusMessage = {
      shipped: "Order has been shipped",
      delivered: "Order has been delivered",
      cancelled: "Order has been cancelled",
      placed: "Order has been placed"
    };
    
    toast.success(statusMessage[status]);
  };

  const getCustomerById = (id: string) => {
    return customers.find((customer) => customer.id === id);
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const getOrdersByCustomerId = (customerId: string) => {
    return orders.filter((order) => order.customerId === customerId);
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        products,
        orders,
        addCustomer,
        addOrder,
        updateOrderStatus,
        getCustomerById,
        getProductById,
        getOrderById,
        getOrdersByCustomerId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};