export interface OrderInvoice {
  id?: number,
  sale_date: Date | string,
  quantity: number,
  total_money: number,
  iscompleted: boolean,
  created_at?: Date,
  updated_at: Date
}
