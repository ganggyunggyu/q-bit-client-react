import React from 'react';
import { useCert } from '@/entities';
import { Button, Tabs, useRouter } from '@/shared';
import { TitleBackAppBar } from '@/widgets';
import { Heart } from 'lucide-react';

export const CertDetailPage = () => {
  const { params } = useRouter();

  const { data: cert, isLoading } = useCert({ certId: params?.id });

  const [selectedTab, setSelectedTab] = React.useState('schedule');

  const handleTabClick = (tab: 'schedule' | 'way' | 'info') => {
    setSelectedTab(tab);
  };

  if (isLoading) return null;

  return (
    <main className="flex flex-col">
      <TitleBackAppBar title={'상세정보'} />
      <section className="">
        <p className=" ">{cert.qualgbnm}</p>
        <h1 className="">{cert.jmfldnm}</h1>
        <p className=" ">시행기관 : {cert.agency}</p>
        <p className=" ">대분류 : {cert.obligfldnm}</p>
        <p className=" ">소분류 : {cert.mdobligfldnm}</p>
      </section>

      <Tabs
        tabKey="cert-detail"
        tabs={[
          { id: 'schedule', label: '시험 일정' },
          { id: 'way', label: '취득 방법' },
          { id: 'info', label: '기타 정보' },
        ]}
        selected={selectedTab}
        onSelect={handleTabClick}
      />

      {selectedTab === 'schedule' && <section>스케쥴 섹션</section>}
      {selectedTab === 'way' && <section>취득방법 섹션</section>}
      {selectedTab === 'info' && <section>정보 섹션 섹션</section>}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-between items-center">
        <Button size="lg">리마인드</Button>
        <button>
          <Heart />
        </button>
      </div>
    </main>
  );
};

export default CertDetailPage;
