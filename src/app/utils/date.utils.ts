import { CURRENT_YEAR } from '../constant/common';

export const isDate = (date: Date | string) => {
  if (date instanceof Date) {
    return !!date.getDate()
  }
  return !isNaN(Date.parse(date));
}

export const getAge = (date: Date) => {
  if (!isDate(date)) {
    return 0
  }
  return CURRENT_YEAR - date.getFullYear();
}
