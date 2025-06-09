import { useQuery } from '@tanstack/react-query';
import {
  getCert,
  getCertList,
  getUpcomingCertList,
  getCertListSorted,
  getSearchCertName,
  getPopularCerts,
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
    staleTime: 1000 * 60 * 10,
  });

export const useSortedCertList = (params: getCertListSortedParams) =>
  useQuery({
    queryKey: ['certSorted', params],
    queryFn: () => getCertListSorted(params),
    enabled: !!params.sort && !!params.limit,
  });

export const useSearchCertNameQuery = (keyword: string) => {
  return useQuery({
    queryKey: ['cert', 'keyword', keyword],
    queryFn: () => getSearchCertName(keyword),
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
};

export const usePopularCerts = () => {
  return useQuery({
    queryKey: ['popularCerts'],
    queryFn: getPopularCerts,
    staleTime: 1000 * 60 * 10,
  });
};
