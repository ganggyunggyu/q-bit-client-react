const CALLBACK = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_KAKAO_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

export const handleKakaoLogin = () => {
  window.location.href = CALLBACK;
};
