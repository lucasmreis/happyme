export const clone = o => JSON.parse(JSON.stringify(o));

export const addItem = (i, array) => {
  let c = clone(array);
  c.push(i);
  return c;
};

export const removeItem = (i, array) => {
  let c = clone(array);
  c.splice(i, 1);
  return c;
};

export const assoc = (prop, v, obj) => {
  if (!obj) {
    return o => assoc(prop, v, o);
  }
  let c = clone(obj);
  c[prop] = v;
  return c;
};

export const prop = p => obj => obj[p];