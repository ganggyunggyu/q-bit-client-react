import { useMutation } from '@tanstack/react-query';
import { aiRecommendApi } from '../api/ai-recommend.api';
import { AiRecommendRequest, AiRecommendResponse } from '../model/ai-recommend.model';

export const useGetAiRecommendations = () => {
  return useMutation<AiRecommendResponse, Error, AiRecommendRequest>({
    mutationFn: (data: AiRecommendRequest) => aiRecommendApi.getRecommendations(data),
  });
};
