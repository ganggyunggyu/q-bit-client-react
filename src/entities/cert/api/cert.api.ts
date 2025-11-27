import { axios } from '@/app/config';
import { Cert, SearchCertParams, ScheduleStatus } from '../model/cert.model';

export const certApi = {
  searchCerts: async (params: SearchCertParams): Promise<Cert[]> => {
    const { data } = await axios.get<Cert[]>('/cert/search', { params });
    return data;
  },

  searchCertsByKeyword: async (q: string, limit: number = 10): Promise<Cert[]> => {
    const { data } = await axios.get<Cert[]>('/cert/search/keyword', {
      params: { q, limit },
    });
    return data;
  },

  getPopularCerts: async (): Promise<Cert[]> => {
    const { data } = await axios.get<Cert[]>('/cert/popular');
    return data;
  },

  getUpcomingCerts: async (limit: number = 3): Promise<Cert[]> => {
    const { data } = await axios.get<Cert[]>('/cert/upcoming', {
      params: { limit },
    });
    return data;
  },

  getCertById: async (id: string): Promise<Cert> => {
    const { data } = await axios.get<Cert>(`/cert/${id}`);
    return data;
  },

  getMyRemindCerts: async (): Promise<Cert[]> => {
    const { data } = await axios.get<Cert[]>('/cert/remind/list');
    return data;
  },

  addRemindCert: async (id: string): Promise<void> => {
    await axios.post(`/cert/remind/${id}`);
  },

  removeRemindCert: async (id: string): Promise<void> => {
    await axios.delete(`/cert/remind/${id}`);
  },

  getScheduleStatus: async (): Promise<ScheduleStatus> => {
    const { data } = await axios.get<ScheduleStatus>('/cert/schedule/status');
    return data;
  },
};
