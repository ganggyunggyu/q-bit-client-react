import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (code && !hasFetched.current) {
      hasFetched.current = true;
      window.location.href = `http://localhost:8080/auth/kakao-callback?code=${code}`;
    }
  }, [code]);

  return <main>로그인 처리 중...</main>;
};
