import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trophy, Search, Calendar, Award } from 'lucide-react';
import { useGetMyRemindCerts } from '@/entities/cert/hooks/cert.hooks';
import { Cert } from '@/entities/cert/model/cert.model';
import { Tabs, Button, useRouter } from '@/shared';
import { CertCard } from '@/features';
import { slideVariants } from '@/app/motion';

const CertCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 animate-pulse">
    <div className="flex gap-3">
      <div className="w-16 h-16 bg-gray-200 rounded-xl" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  </div>
);

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <div className="flex-1 flex flex-col justify-center items-center gap-4 py-16">
    <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center text-text-tertiary">
      {icon}
    </div>
    <div className="flex flex-col items-center gap-1">
      <p className="font-body-sb text-text-primary">{title}</p>
      <p className="font-caption-m text-text-tertiary">{description}</p>
    </div>
    <Button onClick={onAction} variant="outline" size="sm">
      {actionLabel}
    </Button>
  </div>
);

// 임시 합격 기록 타입 (나중에 entities로 이동)
type PassedCert = {
  _id: string;
  certId: string;
  certName: string;
  certType: string;
  passedDate: string;
  score?: number;
  grade?: string;
};

// 합격 기록 카드 컴포넌트
const PassedCertCard: React.FC<{ cert: PassedCert }> = ({ cert }) => {
  const passedDate = new Date(cert.passedDate);
  const formattedDate = `${passedDate.getFullYear()}.${String(passedDate.getMonth() + 1).padStart(2, '0')}.${String(passedDate.getDate()).padStart(2, '0')}`;

  return (
    <div className="bg-bg-primary rounded-2xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center shrink-0">
          <Trophy size={24} className="text-green" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-caption-m text-text-tertiary">{cert.certType}</p>
          <p className="font-body-sb text-text-primary truncate">{cert.certName}</p>
          <div className="flex items-center gap-2 mt-1">
            <Calendar size={14} className="text-text-tertiary" />
            <span className="font-caption-m text-text-tertiary">{formattedDate} 취득</span>
          </div>
        </div>
        {cert.score && (
          <div className="text-right">
            <p className="font-headline-sb text-primary">{cert.score}점</p>
            {cert.grade && (
              <p className="font-caption-m text-text-tertiary">{cert.grade}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const MyCertPage = () => {
  const { navigate } = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<'remind' | 'passed'>(
    'remind',
  );

  const { data: remindCerts, isLoading: isRemindCertsLoading } =
    useGetMyRemindCerts();

  // TODO: 실제 API 연동 필요
  const passedCerts: PassedCert[] = [];
  const isPassedCertsLoading = false;

  const handleTabClick = (tab: 'remind' | 'passed') => {
    setSelectedTab(tab);
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const renderRemindContent = () => {
    if (isRemindCertsLoading) {
      return (
        <div className="flex flex-col gap-3 p-4">
          {[1, 2, 3].map((i) => (
            <CertCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (remindCerts && remindCerts.length > 0) {
      return (
        <div className="flex flex-col gap-3 p-4">
          {remindCerts.map((cert: Cert) => (
            <CertCard key={cert._id} cert={cert} dDay={cert.daysLeft} />
          ))}
        </div>
      );
    }

    return (
      <EmptyState
        icon={<Bell size={28} />}
        title="리마인드 할 자격증이 없어요"
        description="어떤 자격증이 있나 살펴볼까요?"
        actionLabel="둘러보기"
        onAction={handleSearchClick}
      />
    );
  };

  const renderPassedContent = () => {
    if (isPassedCertsLoading) {
      return (
        <div className="flex flex-col gap-3 p-4">
          {[1, 2, 3].map((i) => (
            <CertCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (passedCerts && passedCerts.length > 0) {
      return (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-body-sb text-text-primary">
              총 {passedCerts.length}개 취득
            </p>
            <div className="flex items-center gap-1">
              <Award size={16} className="text-primary" />
              <span className="font-caption-sb text-primary">축하해요!</span>
            </div>
          </div>
          {passedCerts.map((cert) => (
            <PassedCertCard key={cert._id} cert={cert} />
          ))}
        </div>
      );
    }

    return (
      <EmptyState
        icon={<Trophy size={28} />}
        title="아직 합격 기록이 없어요"
        description="첫 번째 합격을 기록해보세요!"
        actionLabel="자격증 찾기"
        onAction={handleSearchClick}
      />
    );
  };

  return (
    <main className="flex flex-col h-screen bg-bg-secondary pt-safe">
      <div className="sticky top-0 z-10 bg-bg-secondary">
        <Tabs
          tabKey="my-cert"
          tabs={[
            { id: 'remind', label: '리마인드' },
            { id: 'passed', label: '합격 기록' },
          ]}
          selected={selectedTab}
          onSelect={handleTabClick}
        />
      </div>

      <section className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === 'remind' ? (
            <motion.div
              key="remind"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
              className="min-h-full flex flex-col"
            >
              {renderRemindContent()}
            </motion.div>
          ) : (
            <motion.div
              key="passed"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
              className="min-h-full flex flex-col"
            >
              {renderPassedContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default MyCertPage;
