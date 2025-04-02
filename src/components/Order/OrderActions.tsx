
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { OrderType } from "../../types/types";
import { Check, MoreVertical, Package, Truck, X } from "lucide-react";

interface OrderActionsProps {
  order: OrderType;
  onStatusUpdate: (orderId: string, status: OrderType["status"]) => void;
}

const OrderActions = ({ order, onStatusUpdate }: OrderActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {order.status === "placed" && (
          <>
            <DropdownMenuItem
              onClick={() => onStatusUpdate(order.id, "shipped")}
              className="gap-2"
            >
              <Package size={16} />
              <span>Mark as Shipped</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusUpdate(order.id, "cancelled")}
              className="gap-2 text-red-500"
            >
              <X size={16} />
              <span>Cancel Order</span>
            </DropdownMenuItem>
          </>
        )}
        {order.status === "shipped" && (
          <DropdownMenuItem
            onClick={() => onStatusUpdate(order.id, "delivered")}
            className="gap-2"
          >
            <Truck size={16} />
            <span>Mark as Delivered</span>
          </DropdownMenuItem>
        )}
        {order.status !== "delivered" && order.status !== "cancelled" && (
          <DropdownMenuItem
            onClick={() => onStatusUpdate(order.id, "cancelled")}
            className="gap-2 text-red-500"
          >
            <X size={16} />
            <span>Cancel Order</span>
          </DropdownMenuItem>
        )}
        {(order.status === "cancelled" || order.status === "delivered") && (
          <DropdownMenuItem disabled className="text-muted-foreground gap-2">
            <Check size={16} />
            <span>Order Completed</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;