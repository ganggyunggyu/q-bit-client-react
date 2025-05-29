import React from 'react';
import { Button, ButtonProps } from '../atom-button';

export const KakaoLoginButton: React.FC<ButtonProps> = (props) => {
  console.log('카카오 클라이언트:', import.meta.env.VITE_KAKAO_CLIENT_ID);
  console.log('리다이렉트 URI:', import.meta.env.VITE_KAKAO_REDIRECT_URI);

  const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = CALLBACK;
  };

  return (
    <Button
      type="button"
      onClick={handleKakaoLogin}
      variant="kakao"
      className="flex gap-2 border-0"
      {...props}
    >
      카카오로 시작하기
    </Button>
  );
};
