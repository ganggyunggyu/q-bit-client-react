import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trophy, Bell, BellOff, Loader2 } from 'lucide-react';

import {
  useAddRemindCert,
  useGetCertById,
  useGetMyRemindCerts,
  useRemoveRemindCert,
} from '@/entities/cert/hooks/cert.hooks';
import { Button, Tabs, useRouter } from '@/shared';
import { AppBar, CheerModal } from '@/widgets';
import { PassedCertSheet } from '@/features/passed-cert';
import { CertScheduleSection } from './cert-schedule-section';

export const CertDetailPage = () => {
  const { params } = useRouter();
  const certId = params?.id;

  const { data: cert, isLoading } = useGetCertById(certId ?? '');
  const { data: remindCerts } = useGetMyRemindCerts();
  const { mutate: addRemindCert, isPending: isAdding } = useAddRemindCert();
  const { mutate: removeRemindCert, isPending: isRemoving } = useRemoveRemindCert();

  const [selectedTab, setSelectedTab] = React.useState('schedule');
  const [showCheer, setShowCheer] = useState(false);
  const [showPassedSheet, setShowPassedSheet] = useState(false);

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
          setShowCheer(true);
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
      <CheerModal
        isOpen={showCheer}
        onClose={() => setShowCheer(false)}
        certName={cert.name}
      />

      <PassedCertSheet
        isOpen={showPassedSheet}
        onClose={() => setShowPassedSheet(false)}
        certId={certId}
        certName={cert.name}
      />

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
        <button
          onClick={() => setShowPassedSheet(true)}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-green/10 text-green hover:bg-green/20 transition-all active:scale-95"
        >
          <Trophy size={22} />
        </button>
      </footer>
    </main>
  );
};

export default CertDetailPage;
