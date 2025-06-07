import { TitleBellAppBar, CategoryGrid, TopCertList } from '@/widgets';

import { CertCard } from '@/features';

import { certMock } from '@/entities/cert/mock/cert.mock';

import { Input } from '@/shared';
import { PROJECT_NAME_EN } from '@/shared/constants/core';

export const MainPage = () => {
  return (
    <main className="flex flex-col gap-8 pb-[100px] pt-[85px]">
      <section
        className="relative flex flex-col justify-center w-full gap-3"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-bg-primary), transparent)`,
        }}
      >
        <TitleBellAppBar title={PROJECT_NAME_EN} />
        <Input
          className="bg-white z-1 w-11/12"
          placeholder="찾고있는 자격증을 검색해보세요."
        />
        <CategoryGrid />
      </section>

      <TopCertList
        title={
          <p>
            <span className="text-primary">20대</span>에게 가장 인기 많은 자격증
          </p>
        }
        certs={certMock}
      />
      <section className="bg-bg-primary p-3 flex flex-col gap-3 rounded-2xl">
        <p className="text-black-primary font-headline-m pb-1">
          접수까지 일주일!
        </p>

        {certMock.slice(0, 3).map((cert, index) => {
          return <CertCard cert={cert} dDay={index + 2} />;
        })}
      </section>
    </main>
  );
};
