import React from 'react';
import { TitleAppBar } from '@/widgets';
import { useGetMyRemindCerts } from '@/entities/cert/hooks/cert.hooks';
import { Cert } from '@/entities/cert/model/cert.model';
import { Tabs, Button, useRouter } from '@/shared';
import { CertCard } from '@/features'; // CertCard 컴포넌트 임포트 (가정)

export const MyCertPage = () => {
  const { navigate } = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<'remind' | 'bookmark'>(
    'remind',
  );

  const { data: remindCerts, isLoading: isRemindCertsLoading } =
    useGetMyRemindCerts();

  const handleTabClick = (tab: 'remind' | 'bookmark') => {
    setSelectedTab(tab);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <main className="flex flex-col h-[calc(100vh-150px)]">
      <TitleAppBar title="내 자격증" />

      <Tabs
        tabKey="my-cert"
        tabs={[
          { id: 'remind', label: '리마인드' },
          { id: 'bookmark', label: '찜' },
        ]}
        selected={selectedTab}
        onSelect={handleTabClick}
      />

      <section className="flex-1 flex flex-col justify-center items-center bg-alternative">
        {selectedTab === 'remind' &&
          (isRemindCertsLoading ? (
            <p>로딩 중...</p>
          ) : remindCerts && remindCerts.length > 0 ? (
            <div className="flex flex-col gap-4 w-full px-4 py-4">
              {remindCerts.map((cert: Cert) => (
                <CertCard key={cert._id} cert={cert} dDay={cert.daysLeft} /> // dDay는 임시값
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="font-body ">리마인드 할 자격증이 없어요.</p>
              <p className="text-body-s text-black-tertiary">
                어떤 자격증이 있나 살펴볼까요?
              </p>
              <Button onClick={handleSearchClick} variant="outline">
                둘러보기
              </Button>
            </div>
          ))}
        {selectedTab === 'bookmark' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-body-m text-black-primary">
              찜한 자격증이 없어요.
            </p>
            <p className="text-body-s text-black-tertiary">
              관심 자격증을 찜해보세요!
            </p>
            <Button variant="outline">자격증 찾기</Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyCertPage;
