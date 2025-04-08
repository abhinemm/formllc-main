import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, expiry?: number) => {
  if (expiry) {
    Cookies.set(name, value, { expires: expiry }); // Expires in 'expiry' days
  } else {
    Cookies.set(name, value, { expires: 365 * 100 }); // Effectively never expires
  }
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};
