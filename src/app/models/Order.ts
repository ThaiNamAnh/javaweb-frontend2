import { OrderItem } from "./OrderItem";

export interface Order{
  id: string;
  totalQuantity: number;
  totalPrice: number;
  dateCreated: Date;
  customerId: string;
  orderItems: OrderItem[];
}
