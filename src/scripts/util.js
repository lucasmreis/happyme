const clone = o => JSON.parse(JSON.stringify(o));

export const addItem = (i, array) => {
  let c = clone(array);
  c.push(i);
  return c;
};

export const assoc = (prop, v, obj) => {
  let c = clone(obj);
  c[prop] = v;
  return c;
};

export const prop = p => obj => obj[p];