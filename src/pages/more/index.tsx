import React from 'react';
import { Button, SelectBox, useRouter } from '@/shared';
import { TitleAppBar } from '@/widgets';

export const MorePage = () => {
  const { navigate } = useRouter();

  const handleLoginClick = () => {
    navigate('/auth/login');
  };
  return (
    <main className="flex flex-col h-screen pb-[100px] pt-[85px] gap-4 bg-alternative">
      <TitleAppBar title={'더보기'} />

      <section className="flex flex-col gap-3 px-3 ">
        <Button onClick={handleLoginClick} variant="outline" size="lg">
          로그인해주세요
        </Button>
        <SelectBox className="flex justify-start">기본정보</SelectBox>
        <SelectBox className="flex justify-start">고객지원</SelectBox>
      </section>

      <section className="flex flex-col  px-3 bg-alternative">
        <SelectBox className="flex justify-start">공지사항</SelectBox>
        <SelectBox className="flex justify-start">이용약관</SelectBox>
        <SelectBox className="flex justify-start">개인정보처리방침</SelectBox>
        <SelectBox className="flex justify-start">오픈소스라이선스</SelectBox>
      </section>
    </main>
  );
};
