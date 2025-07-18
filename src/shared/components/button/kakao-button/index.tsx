import React from 'react';
import { Button, ButtonProps } from '../atom-button';
import { ChevronRight } from 'lucide-react';

const KakaoIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z"
        fill="#FFE812"
      />
      <path
        d="M12 5.5C7.5817 5.5 4 8.3241 4 11.8077C4 14.0599 5.4974 16.0361 7.74985 17.1521C7.6273 17.5747 6.9624 19.8709 6.9359 20.0513C6.9359 20.0513 6.92 20.1868 7.00775 20.2385C7.09555 20.2901 7.19875 20.25 7.19875 20.25C7.45045 20.2149 10.1175 18.3415 10.5791 18.0162C11.0403 18.0815 11.5151 18.1154 12 18.1154C16.4183 18.1154 20 15.2914 20 11.8077C20 8.3241 16.4183 5.5 12 5.5Z"
        fill="#381F1F"
      />
    </svg>
  );
};

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
      className="flex gap-2 border-0 "
      {...props}
    >
      <KakaoIcon />
      <p>카카오로 시작하기</p>
      <ChevronRight />
    </Button>
  );
};
