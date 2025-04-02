import { CustomerType, OrderType, ProductType } from "../types/types";

// Mock Customers
export const customers: CustomerType[] = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, CA 90210",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "cust-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    address: "456 Oak Ave, Somewhere, NY 10001",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "cust-3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "555-456-7890",
    address: "789 Pine Rd, Nowhere, TX 75001",
    createdAt: new Date("2023-03-10"),
  },
];

// Mock Products
export const products: ProductType[] = [
  {
    id: "prod-1",
    name: "Premium Bluetooth Headphones",
    description: "Noise-cancelling over-ear headphones with 20-hour battery life",
    price: 249.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300",
  },
  {
    id: "prod-2",
    name: "Smart Watch Series 5",
    description: "Fitness and health tracking with heart rate monitor and GPS",
    price: 399.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300",
  },
  {
    id: "prod-3",
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton, ethically sourced and eco-friendly",
    price: 29.99,
    category: "Apparel",
    imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=300",
  },
  {
    id: "prod-4",
    name: "Professional Knife Set",
    description: "6-piece stainless steel chef's knife set with wood block",
    price: 129.99,
    category: "Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1593618998160-949634de1e49?q=80&w=300",
  },
  {
    id: "prod-5",
    name: "Ultra HD Smart TV",
    description: "55-inch 4K resolution with built-in streaming services",
    price: 899.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=300",
  },
];

// Mock Orders
export const orders: OrderType[] = [
  {
    id: "ord-1",
    customerId: "cust-1",
    products: [
      { productId: "prod-1", quantity: 1, price: 249.99 },
      { productId: "prod-3", quantity: 2, price: 29.99 },
    ],
    totalAmount: 309.97,
    status: "delivered",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-10"),
  },
  {
    id: "ord-2",
    customerId: "cust-2",
    products: [
      { productId: "prod-2", quantity: 1, price: 399.99 },
    ],
    totalAmount: 399.99,
    status: "shipped",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-14"),
  },
  {
    id: "ord-3",
    customerId: "cust-3",
    products: [
      { productId: "prod-4", quantity: 1, price: 129.99 },
      { productId: "prod-5", quantity: 1, price: 899.99 },
    ],
    totalAmount: 1029.98,
    status: "placed",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-05-20"),
  },
  {
    id: "ord-4",
    customerId: "cust-1",
    products: [
      { productId: "prod-3", quantity: 3, price: 29.99 },
    ],
    totalAmount: 89.97,
    status: "cancelled",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-02"),
  },
];