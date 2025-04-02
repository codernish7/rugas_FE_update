
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { OrderType } from "../../types/types";
import { useData } from "../../context/DataContext";
import { formatCurrency, formatDate } from "../../lib/utils";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const { getCustomerById, getProductById } = useData();
  const customer = getCustomerById(order.customerId);

  return (
    <Card>
      <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="font-semibold">{order.id}</div>
          <div className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</div>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div>
          <div className="text-sm font-medium">Customer</div>
          <div className="text-sm">{customer?.name}</div>
        </div>
        <div>
          <div className="text-sm font-medium">Items</div>
          <ul className="text-sm space-y-1">
            {order.products.map((item) => {
              const product = getProductById(item.productId);
              return (
                <li key={item.productId} className="flex justify-between">
                  <span>
                    {product?.name} <span className="text-muted-foreground">× {item.quantity}</span>
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between font-medium border-t pt-2">
          <div>Total</div>
          <div>{formatCurrency(order.totalAmount)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;