import { usePopularCerts } from '@/entities';
import { cn, useRouter } from '@/shared';
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

  const count = 5;
  const { data: certs = [], isLoading } = usePopularCerts();

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

  if (isLoading) return <div>로딩 중이야... 이딴 거 보여줘야 하냐</div>;
  return (
    <section className="flex flex-col gap-3 rounded-t-2xl">
      <p className="font-headline-m">{title}</p>

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
          {index + 1}. {cert.jmfldnm}
        </p>
      ))}
    </section>
  );
};
