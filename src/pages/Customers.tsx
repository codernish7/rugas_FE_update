import { useState } from "react";
import CustomerForm from "../components/Customer/CustomerForm";
import CustomerList from "../components/Customer/CustomerList";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import SearchInput from "../components/ui/SearchInput";
import { useData } from "../context/DataContext";


const Customers = () => {
  const { customers } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold">Customers</h1>
              <CustomerForm />
            </div>
            
            <div className="space-y-4">
              <SearchInput 
                placeholder="Search customers..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="max-w-md"
              />
              
              <CustomerList customers={filteredCustomers} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;