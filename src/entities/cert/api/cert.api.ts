import { axios } from '@/app/config';

type GetCertDto = {
  certId: string;
};

export const getCert = async ({ certId }: GetCertDto) => {
  try {
    const result = await axios.get(`/cert/${certId}`);
    return result.data;
  } catch (error) {
    console.error('getCert error:', error);
    throw error;
  }
};
type GetCertListParams = {
  keyword?: string;
  obligfldnm?: string;
  mdobligfldnm?: string;
  seriesnm?: string;
  agency?: string;
};

export const getCertList = async (params: GetCertListParams) => {
  try {
    const result = await axios.get('/cert/search', { params });
    return result.data;
  } catch (error) {
    console.error('getCertList error:', error);
    throw error;
  }
};
