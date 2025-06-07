import { axios } from '@/app/config';
import {
  getCertDto,
  getCertListParams,
  getCertListSortedParams,
  getUpcomingCertListParams,
} from '../model';

export const getCert = async ({ certId }: getCertDto) => {
  try {
    const result = await axios.get(`/cert/${certId}`);
    return result.data;
  } catch (error) {
    console.error('getCert error:', error);
    throw error;
  }
};
export const getCertList = async (params: getCertListParams) => {
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
) => {
  try {
    const res = await axios.get('/certs/upcoming', {
      params: { limit: params.limit },
    });
    return res.data;
  } catch (error) {
    console.error('getLatestThreeCertsOpenForApply error:', error);
    throw error;
  }
};

export const getCertListSorted = async (params: getCertListSortedParams) => {
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
