import { axios } from '@/app/config';
import {
  Cert,
  getCertDto,
  getCertListParams,
  getCertListSortedParams,
  getUpcomingCertListParams,
} from '../model';

export const getCert = async (params: getCertDto): Promise<Cert> => {
  try {
    const result = await axios.get(`/cert/${params.certId}`);
    return result.data;
  } catch (error) {
    console.error('getCert error:', error);
    throw error;
  }
};
export const getCertList = async (
  params: getCertListParams,
): Promise<Cert[]> => {
  try {
    const result = await axios.get('/cert/search', { params });
    return result.data;
  } catch (error) {
    console.error('getCertList error:', error);
    throw error;
  }
};

export const getUpcomingCertList = async (
  params: getUpcomingCertListParams,
): Promise<Cert[]> => {
  try {
    const res = await axios.get('/cert/upcoming', {
      params: { limit: params.limit },
    });
    return res.data;
  } catch (error) {
    console.error('getLatestThreeCertsOpenForApply error:', error);
    throw error;
  }
};

export const getCertListSorted = async (
  params: getCertListSortedParams,
): Promise<Cert[]> => {
  try {
    const res = await axios.get('/certs', {
      params: { ...params },
    });
    return res.data;
  } catch (e) {
    console.error('getCertListSorted error:', e);
    throw e;
  }
};

export const getSearchCertName = async (
  q: string,
): Promise<{ jmfldnm: string; _id: string }[]> => {
  const response = await axios.get('/cert/search/keyword', {
    params: { q },
  });
  return response.data;
};

export type PopularCert = {
  _id: string;
  jmfldnm: string;
};

export const getPopularCerts = async (): Promise<PopularCert[]> => {
  const res = await axios.get('/cert/popular');
  return res.data;
};
