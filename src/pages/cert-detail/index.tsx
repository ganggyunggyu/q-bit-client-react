import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useAddRemindCert,
  useGetCertById,
  useGetMyRemindCerts,
  useRemoveRemindCert,
} from '@/entities/cert/hooks/cert.hooks';
import { CertSchedule } from '@/entities/cert/model/cert.model';
import { Button, Tabs, useRouter } from '@/shared';
import { AppBar } from '@/widgets';
import { Heart, Bell, BellOff, Loader2 } from 'lucide-react';

export const CertDetailPage = () => {
  const { params } = useRouter();
  const certId = params?.id;

  const { data: cert, isLoading } = useGetCertById(certId ?? '');
  const { data: remindCerts } = useGetMyRemindCerts();
  const { mutate: addRemindCert, isPending: isAdding } = useAddRemindCert();
  const { mutate: removeRemindCert, isPending: isRemoving } = useRemoveRemindCert();

  const [selectedTab, setSelectedTab] = React.useState('schedule');

  const isReminded = React.useMemo(() => {
    if (!remindCerts || !certId) return false;
    return remindCerts.some((cert) => cert._id === certId);
  }, [remindCerts, certId]);

  const isProcessing = isAdding || isRemoving;

  const handleTabClick = (tab: 'schedule' | 'way' | 'info') => {
    setSelectedTab(tab);
  };

  const handleRemindClick = () => {
    if (!certId || isProcessing) return;

    if (isReminded) {
      removeRemindCert(certId, {
        onSuccess: () => {
          toast.success('리마인드가 해제되었습니다.');
        },
        onError: () => {
          toast.error('리마인드 해제에 실패했습니다.');
        },
      });
    } else {
      addRemindCert(certId, {
        onSuccess: () => {
          toast.success('리마인드에 추가되었습니다!');
        },
        onError: () => {
          toast.error('리마인드 추가에 실패했습니다.');
        },
      });
    }
  };

  if (!certId) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || !cert) return null;

  return (
    <main className="relative w-screen h-screen flex flex-col">
      <AppBar variant="titleBack" title="상세정보" />
      <section className="p-4">
        <p className="text-sm text-gray-500">{cert.type}</p>
        <h1 className="text-xl font-bold">{cert.name}</h1>
        <p className="text-sm">시행기관 : {cert.agency}</p>
        <p className="text-sm">대분류 : {cert.category}</p>
        <p className="text-sm">소분류 : {cert.subCategory}</p>
        {cert.hasSchedule && cert.daysLeft !== null && (
          <p className="text-primary font-bold mt-2">D-{cert.daysLeft}</p>
        )}
        {!cert.hasSchedule && (
          <p className="text-gray-400 mt-2">일정 준비중</p>
        )}
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
        <CertScheduleSection schedule={cert.schedule} hasSchedule={cert.hasSchedule} />
      )}
      {selectedTab === 'way' && <section className="p-4">취득방법 섹션</section>}
      {selectedTab === 'info' && <section className="p-4">정보 섹션</section>}
      <footer className="absolute bottom-0 left-0 w-full z-10 flex px-4 gap-3 bg-alternative py-3 pb-safe [box-shadow:0_-4px_8px_rgba(0,0,0,0.05)]">
        <Button
          size="lg"
          variant={isReminded ? 'secondary' : 'primary'}
          onClick={handleRemindClick}
          disabled={isProcessing}
          className="gap-2"
        >
          {isProcessing ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isReminded ? (
            <BellOff size={20} />
          ) : (
            <Bell size={20} />
          )}
          {isReminded ? '리마인드 해제' : '리마인드'}
        </Button>
        <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[--color-primary] text-[--color-primary] hover:bg-[--color-bg-primary] transition-all active:scale-95">
          <Heart />
        </button>
      </footer>
    </main>
  );
};

export default CertDetailPage;

interface CertScheduleSectionProps {
  schedule?: CertSchedule[];
  hasSchedule: boolean;
}

export const CertScheduleSection: React.FC<CertScheduleSectionProps> = ({
  schedule,
  hasSchedule,
}) => {
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
  };

  if (!hasSchedule) {
    return (
      <section className="p-4">
        <p className="text-body-m text-black-tertiary">
          일정 데이터를 준비중입니다.
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 flex flex-col gap-6 overflow-y-auto pb-[120px]">
      {schedule && schedule.length > 0 ? (
        schedule.map((sch) => (
          <div
            key={sch.round}
            className="p-4 rounded-2xl border border-[--color-border-gray] bg-white flex flex-col gap-4"
          >
            <p className="font-headline-m text-[--color-primary]">{sch.round}</p>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">필기 접수</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.writtenRegStart)} ~ {formatDate(sch.writtenRegEnd)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">필기 시험</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.writtenExamStart)} ~ {formatDate(sch.writtenExamEnd)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">필기 발표</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.writtenResultDate)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">실기 접수</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.practicalRegStart)} ~ {formatDate(sch.practicalRegEnd)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">실기 시험</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.practicalExamStart)} ~ {formatDate(sch.practicalExamEnd)}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-body-m text-[--color-navy]">실기 발표</p>
              <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
                {formatDate(sch.practicalResultDate)}
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
