import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions,
) => {
  const defaultOptions =
    import.meta.env.NODE_ENV === 'development'
      ? { secure: false }
      : { secure: true };

  return cookies.set(name, value, {
    ...defaultOptions,
    ...options,
    sameSite: 'lax',
  });
};
export const getCookie = (name: string) => {
  return cookies.get(name);
};
export const clearCookie = (name: string, options?: CookieOptions) => {
  return cookies.remove(name, {
    path: '/',
    ...options,
  });
};
