// src/entities/auth/api/auth.api.ts

import { axios } from '@/app/config';
import { JoinUserRequest } from '../model/user.model';

export const authApi = {
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  refreshToken: async () => {
    const response = await axios.post('/auth/refresh-token');
    return response.data;
  },

  join: async (userData: JoinUserRequest) => { // userData 타입은 백엔드 JoinUserRequest DTO에 맞춰야 함
    const response = await axios.post('/auth/join', { user: userData });
    return response.data;
  },

  logout: async () => {
    const response = await axios.delete('/auth/logout');
    return response.data;
  },
};