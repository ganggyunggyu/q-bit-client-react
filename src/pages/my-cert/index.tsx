import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Heart, Search } from 'lucide-react';
import { AppBar } from '@/widgets';
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

  const renderRemindContent = () => {
    if (isRemindCertsLoading) {
      return (
        <div className="flex flex-col gap-3 px-4 py-4">
          {[1, 2, 3].map((i) => (
            <CertCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (remindCerts && remindCerts.length > 0) {
      return (
        <div className="flex flex-col gap-3 px-4 py-4">
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

  const renderBookmarkContent = () => (
    <EmptyState
      icon={<Heart size={28} />}
      title="찜한 자격증이 없어요"
      description="관심 자격증을 찜해보세요!"
      actionLabel="자격증 찾기"
      onAction={handleSearchClick}
    />
  );

  return (
    <main className="flex flex-col min-h-screen bg-bg-secondary">
      <AppBar variant="title" title="내 자격증" />

      <Tabs
        tabKey="my-cert"
        tabs={[
          { id: 'remind', label: '리마인드' },
          { id: 'bookmark', label: '찜' },
        ]}
        selected={selectedTab}
        onSelect={handleTabClick}
      />

      <section className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {selectedTab === 'remind' ? (
            <motion.div
              key="remind"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={1}
              className="flex-1 flex flex-col"
            >
              {renderRemindContent()}
            </motion.div>
          ) : (
            <motion.div
              key="bookmark"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={-1}
              className="flex-1 flex flex-col"
            >
              {renderBookmarkContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default MyCertPage;
