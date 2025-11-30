import React from 'react';
import { useGetUpcomingCerts } from '@/entities/cert/hooks/cert.hooks';
import { CertCard } from '@/features';

export const UpcomingCertsSection: React.FC = () => {
  const { data: certListData, isLoading } = useGetUpcomingCerts(3);
  const certList = Array.isArray(certListData) ? certListData : [];

  if (isLoading || !certList.length) return null;

  return (
    <section className="bg-bg-primary flex flex-col gap-(--layout-content-gap) rounded-t-xl pt-(--layout-content-gap) pb-(--layout-page-pb) px-(--layout-page-px) shadow-sm">
      <p className="text-text-primary font-headline-m">
        접수까지 일주일!
      </p>

      <div className="flex flex-col gap-3">
        {certList.map((cert, index) => (
          <CertCard key={cert._id || index} cert={cert} dDay={cert.daysLeft ?? 0} />
        ))}
      </div>
    </section>
  );
};
