export const save = sentences => {
  const data = JSON.stringify(sentences);
  window.localStorage.setItem('happy-me', data);
};

export const load = () => {
  const data = window.localStorage.getItem('happy-me');
  const sentences = JSON.parse(data) || [];
  return sentences;
};
