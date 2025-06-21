import { useQuery } from '@tanstack/react-query';
import { getAuthMe } from '../api';

export const useAuthMe = () => {
  return useQuery({
    queryKey: ['authMe'],
    queryFn: getAuthMe,
  });
};
