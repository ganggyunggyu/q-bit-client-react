import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useGetMyRemindCerts } from '@/entities/cert/hooks/cert.hooks';
import { CertCard } from '@/features';
import { useRouter } from '@/shared';

export const MyRemindCertsSection: React.FC = () => {
  const { data: remindCertsData, isLoading } = useGetMyRemindCerts();
  const remindCerts = Array.isArray(remindCertsData) ? remindCertsData : [];
  const { navigate } = useRouter();

  if (isLoading || !remindCerts.length) return null;

  const handleViewAll = () => {
    navigate('/my-cert');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-(--layout-content-gap) px-(--layout-page-px)"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark size={18} className="text-[--color-primary] fill-[--color-primary]" />
          <p className="text-text-primary font-headline-m">내가 취득하고 싶은 자격증</p>
        </div>
        {remindCerts.length > 3 && (
          <button
            onClick={handleViewAll}
            className="text-[--color-text-secondary] font-caption-m hover:text-[--color-primary] transition-colors"
          >
            전체보기
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {remindCerts.slice(0, 3).map((cert, index) => (
          <motion.div
            key={cert._id || index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <CertCard cert={cert} dDay={cert.daysLeft ?? 0} isLiked />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
