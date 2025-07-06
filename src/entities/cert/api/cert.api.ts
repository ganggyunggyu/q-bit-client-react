import { axios } from '@/app/config';

export const certApi = {
  searchCerts: async (params: {
    keyword?: string;
    agency?: string;
    seriesnm?: string;
    obligfldnm?: string;
    mdobligfldnm?: string;
  }) => {
    const response = await axios.get('/cert/search', { params });
    return response.data;
  },

  getSearchCertByJmnm: async (keyword: string, limit: number = 10) => {
    const response = await axios.get('/cert/search/keyword', {
      params: { q: keyword, limit },
    });
    return response.data;
  },

  getPopularCerts: async () => {
    const response = await axios.get('/cert/popular');
    return response.data;
  },

  getUpcomingCerts: async (limit: number = 3) => {
    const response = await axios.get('/cert/upcoming', {
      params: { limit },
    });
    return response.data;
  },

  getCertById: async (id: string) => {
    const response = await axios.get(`/cert/${id}`);
    return response.data;
  },

  getMyRemindCerts: async () => {
    const response = await axios.get('/cert/remind/list');
    return response.data;
  },

  addRemindCert: async (id: string) => {
    const response = await axios.post(`/cert/remind/${id}`);
    return response.data;
  },

  removeRemindCert: async (id: string) => {
    const response = await axios.delete(`/cert/remind/${id}`);
    return response.data;
  },
};
