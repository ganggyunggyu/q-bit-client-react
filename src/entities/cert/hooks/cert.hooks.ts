import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { certApi } from '../api/cert.api';
import { Cert, SearchCertParams, ScheduleStatus } from '../model/cert.model';

export const certKeys = {
  all: ['certs'] as const,
  search: (params: SearchCertParams) => [...certKeys.all, 'search', params] as const,
  searchKeyword: (q: string, limit?: number) => [...certKeys.all, 'searchKeyword', q, limit] as const,
  popular: () => [...certKeys.all, 'popular'] as const,
  upcoming: (limit?: number) => [...certKeys.all, 'upcoming', limit] as const,
  detail: (id: string) => [...certKeys.all, 'detail', id] as const,
  myRemind: () => [...certKeys.all, 'myRemind'] as const,
  scheduleStatus: () => [...certKeys.all, 'scheduleStatus'] as const,
};

export const useSearchCerts = (params: SearchCertParams) => {
  const hasParams = !!(params.keyword || params.agency || params.grade || params.category || params.subCategory);
  return useQuery<Cert[]>({
    queryKey: certKeys.search(params),
    queryFn: () => certApi.searchCerts(params),
    enabled: hasParams,
  });
};

export const useSearchCertsByKeyword = (q: string, limit?: number) => {
  return useQuery<Cert[]>({
    queryKey: certKeys.searchKeyword(q, limit),
    queryFn: () => certApi.searchCertsByKeyword(q, limit),
    enabled: !!q,
  });
};

export const useGetPopularCerts = () => {
  return useQuery<Cert[]>({
    queryKey: certKeys.popular(),
    queryFn: certApi.getPopularCerts,
  });
};

export const useGetUpcomingCerts = (limit?: number) => {
  return useQuery<Cert[]>({
    queryKey: certKeys.upcoming(limit),
    queryFn: () => certApi.getUpcomingCerts(limit),
  });
};

export const useGetCertById = (id: string) => {
  return useQuery<Cert>({
    queryKey: certKeys.detail(id),
    queryFn: () => certApi.getCertById(id),
    enabled: !!id,
  });
};

export const useGetMyRemindCerts = () => {
  return useQuery<Cert[]>({
    queryKey: certKeys.myRemind(),
    queryFn: certApi.getMyRemindCerts,
  });
};

export const useAddRemindCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: certApi.addRemindCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certKeys.myRemind() });
    },
  });
};

export const useRemoveRemindCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: certApi.removeRemindCert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: certKeys.myRemind() });
    },
  });
};

export const useGetScheduleStatus = () => {
  return useQuery<ScheduleStatus>({
    queryKey: certKeys.scheduleStatus(),
    queryFn: certApi.getScheduleStatus,
  });
};
