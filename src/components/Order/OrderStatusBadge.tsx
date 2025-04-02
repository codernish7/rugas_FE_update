
import { Badge } from "../../components/ui/badge";
import { OrderStatus } from "../../types/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  switch (status) {
    case "placed":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          Placed
        </Badge>
      );
    case "shipped":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          Shipped
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default OrderStatusBadge;