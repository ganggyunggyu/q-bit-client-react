import { cn } from '@/shared/lib';

interface ReminingDateLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  day: number;
  label?: string;
}

export const ReminingDateLabel: React.FC<ReminingDateLabelProps> = ({
  day,
  label = '시험까지',
  ...props
}) => {
  let status = null;

  const getStatus = () => {
    if (day >= 21) return 'blue';
    if (day >= 14) return 'yellow';
    if (day >= 7) return 'red';

    return 'red';
  };

  status = getStatus();

  return (
    <figure
      className={cn(
        'flex justify-center gap-2 items-center  rounded-2xl px-3 py-1',
        status === 'red' && 'bg-urgent/10 text-urgent',
        status === 'yellow' && 'bg-cautious/10 text-cautious',
        status === 'blue' && 'bg-blue-good/10 text-blue-good',
      )}
      {...props}
    >
      <span className="font-body-sb">{label}</span>
      <span className="font-body-sb">D-{day}</span>
    </figure>
  );
};
