export const getTokenFromLocalStorage = (): string => {
  const data = localStorage.getItem('token');
  const token: string = data ? JSON.parse(data) : '';

  return token;
};

export const setTokenToLocalStorage = (key: string, token: string): void => {
  localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenToLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
