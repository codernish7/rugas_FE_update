import  { useState } from "react";
import { useData } from "../context/DataContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import OrderList from "../components/Order/OrderList";
import OrderForm from "../components/Order/OrderForm";
import SearchInput from "../components/ui/SearchInput";
import { OrderStatus } from "../types/types";

const Orders = () => {
  const { orders, customers, updateOrderStatus } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  // Create a map of customer IDs to names for easy lookup
  const customerMap = customers.reduce<Record<string, string>>(
    (acc, customer) => {
      acc[customer.id] = customer.name;
      return acc;
    },
    {}
  );

  const filteredOrders = orders.filter((order) => {
    const customerName = customerMap[order.customerId] || "";
    
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold">Orders</h1>
              <OrderForm />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <SearchInput 
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={setSearchTerm}
                  className="sm:max-w-md w-full"
                />
                
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
                  <SelectTrigger className="sm:w-[180px]">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="placed">Placed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <OrderList 
                orders={filteredOrders} 
                customers={customerMap}
                onStatusUpdate={updateOrderStatus}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;