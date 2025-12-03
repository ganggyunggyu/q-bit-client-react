import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { passedCertApi } from '../api/passed-cert.api';
import {
  PassedCert,
  CreatePassedCertDto,
  UpdatePassedCertDto,
  GetPassedCertsParams,
} from '../model/passed-cert.model';

export const passedCertKeys = {
  all: ['passedCerts'] as const,
  list: (params?: GetPassedCertsParams) => [...passedCertKeys.all, 'list', params] as const,
  detail: (id: string) => [...passedCertKeys.all, 'detail', id] as const,
};

export const useGetMyPassedCerts = (params?: GetPassedCertsParams) => {
  return useQuery<PassedCert[]>({
    queryKey: passedCertKeys.list(params),
    queryFn: () => passedCertApi.getMyPassedCerts(params),
  });
};

export const useGetPassedCertById = (id: string) => {
  return useQuery<PassedCert>({
    queryKey: passedCertKeys.detail(id),
    queryFn: () => passedCertApi.getById(id),
    enabled: !!id,
  });
};

export const useCreatePassedCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePassedCertDto) => passedCertApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passedCertKeys.all });
    },
  });
};

export const useUpdatePassedCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePassedCertDto }) =>
      passedCertApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passedCertKeys.all });
    },
  });
};

export const useDeletePassedCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => passedCertApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: passedCertKeys.all });
    },
  });
};
