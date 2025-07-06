// src/entities/auth/hooks/auth.hooks.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { User, JoinUserRequest } from '../model/user.model';

// 내 정보 조회 훅
export const useGetMe = () => {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: () => authApi.getMe(),
    retry: false,
  });
};

// accessToken 재발급 훅
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.refreshToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }); // 내 정보 갱신
    },
  });
};

// 회원가입 훅
export const useJoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: JoinUserRequest) => authApi.join(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }); // 내 정보 갱신
    },
  });
};

// 로그아웃 훅
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }); // 내 정보 갱신
    },
  });
};
