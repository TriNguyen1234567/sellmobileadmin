import { User } from '../components/model/user';

export const enum DATE_CONSTANT {
  ORIGINAL_DATE_FORMAT = 'dd-MM-yyyy',
  TECHNICAL_DATE_FORMAT = 'yyyy-MM-dd'
}

export const NA = 'N/A';

export const CURRENT_YEAR = new Date().getFullYear();

export const DEFAULT_BIRTHDAY_YEAR_RANGE = `1800:${CURRENT_YEAR}`;

export const enum JOB_TYPE {
  STUDY_ABROAD = 'STUDY_ABROAD',
  OFFICE_WORKER = 'OFFICE_WORKER',
  SELF_EMPLOYED = 'SELF_EMPLOYED',
  PART_TIME_JOB = 'PART_TIME_JOB'
}

export const enum DEVICE_STATUS {
  NEW = 'NEW',
  USED = 'USED'
}

export const PEOPLE_JOBS = [
  {label: '留学', value: JOB_TYPE.STUDY_ABROAD},
  {label: '会社員', value: JOB_TYPE.OFFICE_WORKER},
  {label: '自営業', value: JOB_TYPE.SELF_EMPLOYED},
  {label: 'アルバイト', value: JOB_TYPE.PART_TIME_JOB}
]

export const MOBILE_STATUSES = [
  {label: '新品', value: DEVICE_STATUS.NEW},
  {label: '中古', value: DEVICE_STATUS.USED}
]

export const STATISTICS_MONTH_LIMIT = 5;
export const STATISTICS_DATE_LIMIT = 5;

export const enum USER_ROLE {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export const USERS: User[] = [
  {
    username: 'admin',
    password: '123456',
    role: USER_ROLE.ADMIN
  },
  {
    username: 'employee',
    password: '123456',
    role: USER_ROLE.EMPLOYEE
  }
]
