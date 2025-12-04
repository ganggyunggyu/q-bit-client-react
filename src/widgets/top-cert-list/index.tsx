import { useGetPopularCerts } from '@/entities';
import { cn, useRouter, Spinner } from '@/shared';
import React from 'react';

interface TopCertListProps {
  title: React.ReactNode;

  interval?: number;
}

export const TopCertList: React.FC<TopCertListProps> = ({
  title,
  interval = 5000,
}) => {
  const [highlightIndex, setHighlightIndex] = React.useState(0);

  const { data: certsData, isLoading } = useGetPopularCerts();
  const certs = Array.isArray(certsData) ? certsData : [];
  const count = certs.length || 5;

  const { navigate } = useRouter();

  const handleNameClick = (id: string) => {
    navigate(`/search/${id}`);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timer);
  }, [count, interval]);

  if (isLoading) {
    return (
      <section className="flex flex-col gap-3 rounded-t-2xl">
        <div className="font-headline-m">{title}</div>
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-3 rounded-t-2xl">
      <div className="font-headline-m">{title}</div>

      {certs.map((cert, index) => (
        <p
          key={cert._id}
          onClick={() => handleNameClick(cert._id)}
          className={cn(
            'p-3 rounded-full transition-all duration-300',
            index === highlightIndex
              ? 'bg-bg-primary text-primary scale-105'
              : 'scale-100',
          )}
        >
          {index + 1}. {cert.name}
        </p>
      ))}
    </section>
  );
};
