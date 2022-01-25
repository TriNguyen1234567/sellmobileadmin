import { Mobile } from './mobile';
import { Customer } from './customer';

export interface Invoice {
  id: number,
  invoice_id?: number,
  sale_date: Date | string,
  customer_id: number,
  quantity: number,
  total_money: number,
  created_at?: Date,
  updated_at?: Date,
  mobiles?: Mobile[],
  customer?: Customer
}
