import { axiosInstance } from '@/app/config';
import { AiRecommendRequest, AiRecommendResponse } from '../model/ai-recommend.model';

export const aiRecommendApi = {
  getRecommendations: async (data: AiRecommendRequest): Promise<AiRecommendResponse> => {
    const response = await axiosInstance.post<AiRecommendResponse>(
      '/ai/recommend',
      data,
    );
    return response.data;
  },
};
