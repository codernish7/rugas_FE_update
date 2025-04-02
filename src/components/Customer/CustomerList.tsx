
import { CustomerType } from "../../types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { formatDate } from "../../lib/utils";

interface CustomerListProps {
  customers: CustomerType[];
  onSelectCustomer?: (customer: CustomerType) => void;
  selectable?: boolean;
}

const CustomerList = ({ 
  customers, 
  onSelectCustomer, 
  selectable = false 
}: CustomerListProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow 
                key={customer.id}
                className={selectable ? "cursor-pointer hover:bg-muted" : ""}
                onClick={() => selectable && onSelectCustomer && onSelectCustomer(customer)}
              >
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{customer.address}</TableCell>
                <TableCell>{formatDate(customer.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;