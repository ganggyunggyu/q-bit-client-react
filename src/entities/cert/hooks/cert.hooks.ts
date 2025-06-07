import { useQuery } from '@tanstack/react-query';
import {
  getCert,
  getCertList,
  getUpcomingCertList,
  getCertListSorted,
} from '../api';
import {
  getCertDto,
  getCertListParams,
  getCertListSortedParams,
  getUpcomingCertListParams,
} from '../model';

export const useCert = ({ certId }: getCertDto) =>
  useQuery({
    queryKey: ['cert', certId],
    queryFn: () => getCert({ certId }),
    enabled: !!certId,
  });

export const useCertList = (params: getCertListParams) =>
  useQuery({
    queryKey: ['certList', params],
    queryFn: () => getCertList(params),
    enabled: !!params,
  });

export const useUpcomingCertList = (params: getUpcomingCertListParams) =>
  useQuery({
    queryKey: ['certUpcoming', params],
    queryFn: () => getUpcomingCertList(params),
    enabled: !!params.limit,
  });

export const useSortedCertList = (params: getCertListSortedParams) =>
  useQuery({
    queryKey: ['certSorted', params],
    queryFn: () => getCertListSorted(params),
    enabled: !!params.sort && !!params.limit,
  });
