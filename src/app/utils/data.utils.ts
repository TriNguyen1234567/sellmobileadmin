export const isEmpty = (object: any): boolean => {
  return [Object, Array].includes((object || {}).constructor) && !Object.entries(object || {}).length;
}

export const notEmpty = (object: any): boolean => {
  return !isEmpty(object);
}

export const isNil = (object: any): boolean => {
  return object == null;
}

export const notNil = (object: any): boolean => {
  return !isNil(object);
}

export const isNull = (object: any): boolean => {
  return object === null;
}

export const notNull = (object: any): boolean => {
  return !isNull(object);
}
