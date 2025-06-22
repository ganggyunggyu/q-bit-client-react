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
  console.log(cert);
  return (
    <main className="relative w-screen h-screen flex flex-col">
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

      {selectedTab === 'schedule' && (
        <CertScheduleSection schedule={cert.schedule} />
      )}
      {selectedTab === 'way' && <section>취득방법 섹션</section>}
      {selectedTab === 'info' && <section>정보 섹션 섹션</section>}
      <footer className="absolute bottom-0 left-0 w-full z-10 flex px-4 gap-3 bg-alternative pb-[50px] pt-[10px] [box-shadow:0_-4px_8px_rgba(0,0,0,0.05)]">
        <Button size="lg">리마인드</Button>
        <button>
          <Heart />
        </button>
      </footer>
    </main>
  );
};

export default CertDetailPage;

interface Schedule {
  description?: string;
  docexamdt?: string;
  docpassdt?: string;
  docregstartdt?: string | null;
  docregenddt?: string | null;
  docsubmitstartdt?: string | null;
  docsubmitentdt?: string | null;
  pracregstartdt?: string | null;
  pracregenddt?: string | null;
  pracexamstartdt?: string | null;
  pracexamenddt?: string | null;
  pracpassdt?: string | null;
}

interface CertScheduleSectionProps {
  schedule: Schedule[];
}

export const CertScheduleSection: React.FC<CertScheduleSectionProps> = ({
  schedule,
}) => {
  // ✅ 회차별로 묶기
  const groupByExam = (schedules: any[]) => {
    const map = new Map();
    schedules.forEach((sch) => {
      const key = `${sch.description}_${sch.docexamdt}`;
      if (!map.has(key)) {
        map.set(key, {
          description: sch.description,
          docexamdt: sch.docexamdt,
          docpassdt: sch.docpassdt,
          pracpassdt: sch.pracpassdt,
          pracexamstartdt: sch.pracexamstartdt,
          pracexamenddt: sch.pracexamenddt,
          docRegPeriods: [],
          pracRegPeriods: [],
        });
      }
      const grouped = map.get(key);
      grouped.docRegPeriods.push({
        start: sch.docregstartdt,
        end: sch.docregenddt,
      });
      grouped.pracRegPeriods.push({
        start: sch.pracregstartdt,
        end: sch.pracregenddt,
      });
    });
    return Array.from(map.values());
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
  };

  return (
    <section className="p-4 flex flex-col gap-6 overflow-y-auto pb-[120px]">
      {schedule && schedule.length > 0 ? (
        groupByExam(schedule).map((group, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col gap-4"
          >
            <p className="font-headline-m text-black-primary">
              {group.description}
            </p>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-black-primary">접수 일정</p>
              <div className="bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-1 text-body-s text-black-secondary">
                {group.docRegPeriods.map((period, i) => (
                  <p key={i}>
                    {formatDate(period.start)} ~ {formatDate(period.end)}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-black-primary">시험 일정</p>
              <div className="bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-1 text-body-s text-black-secondary">
                <div>
                  <p className="text-black-tertiary">필기시험일자</p>
                  <p>{formatDate(group.docexamdt)}</p>
                </div>
                <div>
                  <p className="text-black-tertiary">실기시험 기간</p>
                  <p>
                    {formatDate(group.pracexamstartdt)} ~{' '}
                    {formatDate(group.pracexamenddt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-black-primary">합격자 발표</p>
              <div className="bg-[#F9FAFB] rounded-xl p-3 flex flex-col gap-1 text-body-s text-black-secondary">
                <p>{formatDate(group.docpassdt)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-body-m text-black-tertiary">
          등록된 일정이 없습니다.
        </p>
      )}
    </section>
  );
};
