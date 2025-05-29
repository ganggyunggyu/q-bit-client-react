import { BackIcon } from '@/shared/icons';
import { Button } from '../atom-button';
import { useRouter } from '@/shared/hooks';

export const BackButton = () => {
  const { navigate } = useRouter();
  return (
    <Button
      className="border-none fixed top-12 left-0 "
      variant="round"
      onClick={() => navigate(-1)}
    >
      <BackIcon />
    </Button>
  );
};
