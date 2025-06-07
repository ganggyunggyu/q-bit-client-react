import { Cert } from '@/entities';
import { cn } from '@/shared';
import React from 'react';

interface TopCertListProps {
  title: React.ReactNode;
  certs: Cert[];
  interval?: number;
}

export const TopCertList: React.FC<TopCertListProps> = ({
  title,
  certs,
  interval = 5000,
}) => {
  const [highlightIndex, setHighlightIndex] = React.useState(0);
  const visibleCerts = certs.slice(0, 5);
  const count = visibleCerts.length;
  React.useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  return (
    <section className="flex flex-col gap-3 px-3">
      <p className="font-headline-m">{title}</p>

      {visibleCerts.map((cert, index) => (
        <p
          key={cert._id}
          className={cn(
            'p-3 rounded-full transition-all duration-300',
            index === highlightIndex
              ? 'bg-bg-primary text-primary scale-105'
              : 'scale-100',
          )}
        >
          {index + 1}. {cert.jmfldnm}
        </p>
      ))}
    </section>
  );
};
