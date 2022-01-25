import { JOB_TYPE } from '../../constant/common';

export interface Customer {
  id: number,
  name_vietnamese: string,
  name_japanese: string,
  birthday: Date | string,
  age: number,
  address: string,
  phone: string,
  job: JOB_TYPE,
  created_at?: Date,
  updated_at?: Date
}
