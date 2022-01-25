import { DEVICE_STATUS } from '../../constant/common';

export interface Mobile {
  id: number,
  name: string,
  imei: string,
  color: string,
  status: DEVICE_STATUS,
  price: number,
  invoice_id?: number,
  created_at?: Date,
  updated_at?: Date
}
