// src/pages/onboarding/1-cert/index.tsx

import { useRouter } from '@/shared';
import React from 'react';
import { useSearchParams } from 'react-router';
import { useGetSearchCertByJmnm } from '@/entities/cert/hooks/cert.hooks'; // 추가
import { Cert } from '@/entities/cert/model/cert.model'; // 추가
import { MainLoading } from '@/shared'; // 로딩 스피너를 위해 추가

const Step1Cert = () => {
  const { navigate } = useRouter();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = React.useState(''); // 검색어 상태
  const [interestedCerts, setInterestedCerts] = React.useState<Cert[]>([]); // 관심 자격증 상태

  const { data: searchResults, isLoading: isSearching } = useGetSearchCertByJmnm(searchQuery); // 검색 훅 사용

  const kakaoId = searchParams.get('kakaoId');
  const email = searchParams.get('email');
  const displayName = searchParams.get('displayName');

  const handleNextClick = () => {
    const params = new URLSearchParams({
      kakaoId: kakaoId || '',
      email: email || '',
      displayName: displayName || '',
      interestedCerts: JSON.stringify(interestedCerts.map(cert => cert._id)), // _id만 저장
    });

    navigate(`/onboarding-2?${params.toString()}`);
  };

  const handleCertSelect = (cert: Cert) => {
    setInterestedCerts((prev) => {
      if (prev.some((c) => c._id === cert._id)) {
        return prev.filter((c) => c._id !== cert._id); // 이미 있으면 제거
      } else {
        return [...prev, cert]; // 없으면 추가
      }
    });
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {isSearching && <MainLoading />} {/* 로딩 스피너 */}

        {searchQuery && !isSearching && searchResults && searchResults.length > 0 && (
          <section className="mb-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2">
            {searchResults.map((cert) => (
              <div
                key={cert._id}
                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                  interestedCerts.some((c) => c._id === cert._id) ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleCertSelect(cert)}
              >
                <span>{cert.jmfldnm}</span>
                {interestedCerts.some((c) => c._id === cert._id) && (
                  <span className="text-blue-500">✓</span>
                )}
              </div>
            ))}
          </section>
        )}

        {searchQuery && !isSearching && searchResults && searchResults.length === 0 && (
          <p className="text-gray-500 text-sm mt-2">검색 결과가 없습니다.</p>
        )}

        {interestedCerts.length > 0 && (
          <section className="mb-4 text-left">
            <h2 className="text-md font-semibold text-gray-800 mb-2">선택된 자격증:</h2>
            <div className="flex flex-wrap gap-2">
              {interestedCerts.map((cert) => (
                <span
                  key={cert._id}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => handleCertSelect(cert)} // 클릭 시 제거
                >
                  {cert.jmfldnm} ×
                </span>
              ))}
            </div>
          </section>
        )}

        <footer>
          <button
            type="button"
            onClick={handleNextClick}
            className="px-6 py-2 border border-blue-400 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
          >
            {interestedCerts.length > 0 ? '다음' : '건너뛰기'}
          </button>
        </footer>
      </article>
    </main>
  );
};

export default Step1Cert;