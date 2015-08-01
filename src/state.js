let state = {
  sentences: [
    {id: 123, text: "Lembra da Pretinha!"},
    {id: 456, text: "Lembra do Cotinho!"}
  ]
};

export const current = () => state;

export const update = f => {
  state = f(state);
  return state;
};