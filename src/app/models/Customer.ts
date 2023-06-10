import { Order } from "./Order";

export interface Customer{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: number;
  // avatar?: string;
  // birthdate: Date;
  // xuatxu: string;
  date: string;
  // noidung: string;
  order: Order[];
}


