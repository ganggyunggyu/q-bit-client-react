import { TitleBellAppBar, CategoryGrid, TopCertList } from '@/widgets';

import { CertCard } from '@/features';

import { certMock } from '@/entities/cert/mock/cert.mock';

import { Button, useRouter } from '@/shared';
import { PROJECT_NAME_EN } from '@/shared/constants/core';
import React from 'react';
import { useUpcomingCertList } from '@/entities';
import { axios } from '@/app/config';

export const MainPage = () => {
  const getAuthMe = async () => {
    const result = await axios.get('/auth/me');

    console.log(result);
  };

  React.useEffect(() => {
    getAuthMe();
  }, []);
  const { navigate } = useRouter();
  const handleSearchClick = () => {
    navigate('/search');
  };

  const { data, isLoading } = useUpcomingCertList({ limit: 3 });

  return (
    <main className="flex flex-col gap-8 pb-[100px] pt-[85px]">
      <section
        className="relative flex flex-col justify-center w-full gap-3"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-bg-primary), transparent)`,
        }}
      >
        <TitleBellAppBar title={PROJECT_NAME_EN} />

        <Button
          className="w-11/12 mx-auto text-start border-[2px]"
          variant="outline"
          size="lg"
          onClick={handleSearchClick}
        >
          <p className="w-full  pl-4 text-left text-primary/50">
            찾고있는 자격증을 검색해보세요.
          </p>
        </Button>
        <CategoryGrid />
      </section>

      <TopCertList
        title={
          <React.Fragment>
            <span className="text-primary">20대</span>
            <span>에게 가장 인기 많은 자격증</span>
          </React.Fragment>
        }
      />
      <section className="bg-bg-primary p-3 flex flex-col gap-3 rounded-2xl">
        <p className="text-black-primary font-headline-m pb-1">
          접수까지 일주일!
        </p>

        {!isLoading
          ? data.map((cert, index) => {
              return <CertCard key={index} cert={cert} dDay={index + 2} />;
            })
          : ''}
      </section>
    </main>
  );
};
