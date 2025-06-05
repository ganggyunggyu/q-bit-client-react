import { cn } from '@/shared';

interface RemainingDateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  day: number;
}

export const RemainingDateCard: React.FC<RemainingDateCardProps> = ({
  day,
  ...props
}) => {
  let status = null;

  const getStatus = () => {
    if (day >= 21) return 'blue';
    if (day >= 14) return 'yellow';
    if (day >= 7) return 'red';
  };

  status = getStatus();

  return (
    <figure
      className={cn(
        'flex justify-between items-center  rounded-xl px-6 py-2',
        status === 'red' && 'bg-urgent/10 text-urgent',
        status === 'yellow' && 'bg-cautious/10 text-cautious',
        status === 'blue' && 'bg-blue-good/10 text-blue-good',
      )}
      {...props}
    >
      <span className="font-caption-m">시험까지</span>
      <span className="font-title-m">D-{day}</span>
    </figure>
  );
};
