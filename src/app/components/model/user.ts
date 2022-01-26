import { USER_ROLE } from '../../constant/common';

export interface User {
  username: string,
  password?: string,
  role: USER_ROLE
}
