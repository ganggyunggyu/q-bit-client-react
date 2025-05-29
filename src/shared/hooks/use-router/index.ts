import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { pathname, search, hash } = location;

  const push = (path: string) => navigate(path);
  const replace = (path: string) => navigate(path, { replace: true });
  const back = () => navigate(-1);
  const go = (n: number) => navigate(n);

  const query = Object.fromEntries(new URLSearchParams(search));
  const getQuery = <T extends Record<string, any>>(
    search: string,
  ): Partial<T> => {
    const q: Partial<T> = {};
    const params = new URLSearchParams(search);

    params.forEach((value, key) => {
      q[key as keyof T] = value as unknown as T[keyof T];
    });

    return q;
  };

  const getIsCurrent = (path: string) => pathname === path;
  const getIsMatch = (pattern: string | RegExp) =>
    typeof pattern === 'string' ? pathname === pattern : pattern.test(pathname);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const getHash = () => hash.replace('#', '');
  const setHash = (h: string) => navigate(`${pathname}#${h}`);

  return {
    location,
    navigate,
    pathname,
    search,
    query,
    params,
    push,
    replace,
    back,
    go,
    getQuery,
    getIsCurrent,
    getIsMatch,
    scrollToTop,
    getHash,
    setHash,
  };
};
