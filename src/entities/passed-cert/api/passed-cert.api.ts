import { axios } from '@/app/config';
import {
  PassedCert,
  CreatePassedCertDto,
  UpdatePassedCertDto,
  GetPassedCertsParams,
} from '../model/passed-cert.model';

export const passedCertApi = {
  create: async (dto: CreatePassedCertDto): Promise<PassedCert> => {
    const { data } = await axios.post<PassedCert>('/passed-cert', dto);
    return data;
  },

  getMyPassedCerts: async (params?: GetPassedCertsParams): Promise<PassedCert[]> => {
    const { data } = await axios.get<PassedCert[]>('/passed-cert', { params });
    return data;
  },

  getById: async (id: string): Promise<PassedCert> => {
    const { data } = await axios.get<PassedCert>(`/passed-cert/${id}`);
    return data;
  },

  update: async (id: string, dto: UpdatePassedCertDto): Promise<PassedCert> => {
    const { data } = await axios.patch<PassedCert>(`/passed-cert/${id}`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`/passed-cert/${id}`);
  },
};
