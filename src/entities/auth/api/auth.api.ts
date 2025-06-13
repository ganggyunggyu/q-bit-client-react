import { axios } from '@/app/config';

export const postJoin = async (params: {
  user: {
    kakaoId: string;
    email?: string;
    displayName: string;
    interestedCerts: any[];
    remindType?: string;
  };
}) => {
  const res = await axios.post('/auth/join', params);
  return res.data;
};
