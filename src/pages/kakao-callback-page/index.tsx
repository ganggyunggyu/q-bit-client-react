import { MainLoading } from '@/shared';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const KakaoCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const hasFetched = useRef(false);

  useEffect(() => {
    if (code && !hasFetched.current) {
      hasFetched.current = true;
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/kakao-callback?code=${code}`;
    }
  }, [code]);

  return (
    <main className="h-screen flex items-center justify-center">
      <MainLoading />
    </main>
  );
};

export default KakaoCallbackPage;
