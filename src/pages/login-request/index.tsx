import { KakaoLoginButton } from '@/shared';
import { TitleBackAppBar } from '@/widgets';

const LoginRequest = () => {
  return (
    <main className="relative flex flex-col items-center justify-center  h-[calc(100vh-56px)]  gap-4 bg-alternative px-3 overflow-hidden">
      <TitleBackAppBar title={'로그인'} className=" absolute top-0 left-3" />

      <section className="flex flex-col gap-8">
        <article className="flex flex-col gap-2 items-center justify-center font-headline-sb">
          <p>
            지금 <span className="text-blue-good">큐빗</span>을 시작하고
          </p>
          <p>자격증을 리마인드 해보세요!</p>
        </article>

        <article className="flex flex-col items-center justify-center">
          <KakaoLoginButton />
        </article>
      </section>
    </main>
  );
};

export default LoginRequest;
