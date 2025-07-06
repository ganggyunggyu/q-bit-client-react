// src/entities/cert/hooks/cert.hooks.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { certApi } from '../api/cert.api'; // api 경로 수정
import { Cert } from '../model/cert.model'; // Cert 타입은 model에 정의되어 있다고 가정

// Cert 타입 정의 (임시, 실제는 model/cert.model.ts에서 가져와야 함)
// interface Cert {
//   _id: string;
//   jmfldnm: string;
//   agency: string;
//   seriesnm: string;
//   // ... 기타 필드
// }

// 자격증 검색 훅
export const useSearchCerts = (params: {
  keyword?: string;
  agency?: string;
  seriesnm?: string;
  obligfldnm?: string;
  mdobligfldnm?: string;
}) => {
  return useQuery<Cert[]> ({
    queryKey: ['certs', 'search', params],
    queryFn: () => certApi.searchCerts(params),
    enabled: !!(params.keyword || params.agency || params.seriesnm || params.obligfldnm || params.mdobligfldnm), // 검색 조건이 있을 때만 실행
  });
};

// 키워드 자격증 검색 훅
export const useGetSearchCertByJmnm = (keyword: string, limit?: number) => {
  return useQuery<Cert[]> ({
    queryKey: ['certs', 'searchByKeyword', keyword, limit],
    queryFn: () => certApi.getSearchCertByJmnm(keyword, limit),
    enabled: !!keyword, // 키워드가 있을 때만 실행
  });
};

// 인기 자격증 조회 훅
export const useGetPopularCerts = () => {
  return useQuery<Cert[]> ({
    queryKey: ['certs', 'popular'],
    queryFn: () => certApi.getPopularCerts(),
  });
};

// 예정 자격증 조회 훅
export const useGetUpcomingCerts = (limit?: number) => {
  return useQuery<Cert[]> ({
    queryKey: ['certs', 'upcoming', limit],
    queryFn: () => certApi.getUpcomingCerts(limit),
  });
};

// 자격증 상세 조회 훅
export const useGetCertById = (id: string) => {
  return useQuery<Cert> ({
    queryKey: ['certs', id],
    queryFn: () => certApi.getCertById(id),
    enabled: !!id, // ID가 있을 때만 실행
  });
};

// 내 리마인드 자격증 리스트 조회 훅
export const useGetMyRemindCerts = () => {
  return useQuery<Cert[]> ({
    queryKey: ['certs', 'myRemind'],
    queryFn: () => certApi.getMyRemindCerts(),
  });
};

// 리마인드 자격증 추가 훅
export const useAddRemindCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => certApi.addRemindCert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certs', 'myRemind'] }); // 리마인드 목록 갱신
    },
  });
};

// 리마인드 자격증 제거 훅
export const useRemoveRemindCert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => certApi.removeRemindCert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certs', 'myRemind'] }); // 리마인드 목록 갱신
    },
  });
};