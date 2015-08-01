export const addItem = (i, array) => {
  array.push(i);
  return array;
};

export const assoc = (prop, v, obj) => {
  obj[prop] = v;
  return obj;
};