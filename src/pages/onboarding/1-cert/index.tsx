import { useRouter } from '@/shared';
import React from 'react';
import { useSearchParams } from 'react-router';

const Step1Cert = () => {
  const { navigate } = useRouter();

  const [searchParams] = useSearchParams();

  const [interestedCerts, setInterestedCerts] = React.useState([]);

  const kakaoId = searchParams.get('kakaoId');
  const email = searchParams.get('email');
  const displayName = searchParams.get('displayName');

  const handleNextClick = () => {
    const params = new URLSearchParams({
      kakaoId: kakaoId || '',
      email: email || '',
      displayName: displayName || '',
      interestedCerts: JSON.stringify(interestedCerts), // ← 배열 → 문자열
    });

    navigate(`/onboarding-2?${params.toString()}`);
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-white to-blue-50">
      <article className="text-center max-w-md w-full">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Qbit에 오신 걸 환영해요!
          </h1>
          <p className="text-gray-600">보려고 마음 먹은 자격증이 있으신가요?</p>
        </header>

        <section className="mb-4">
          <label htmlFor="certificateSearch" className="sr-only">
            자격증 검색
          </label>
          <input
            id="certificateSearch"
            type="text"
            placeholder="원하는 자격증을 검색해보세요."
            className="w-full px-4 py-3 border border-blue-400 rounded-full text-center text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </section>

        <footer>
          <button
            type="button"
            onClick={handleNextClick}
            className="px-6 py-2 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
          >
            건너뛰기
          </button>
        </footer>
      </article>
    </main>
  );
};

export default Step1Cert;
