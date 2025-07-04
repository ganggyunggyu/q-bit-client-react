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

export const getAuthMe = async () => {
  try {
    const result = await axios.get('/auth/me');

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await axios.delete('/auth/logout');
};
