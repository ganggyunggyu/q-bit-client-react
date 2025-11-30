import { create } from 'zustand';
import { AiRecommendResponse } from './ai-recommend.model';

interface AiRecommendState {
  result: AiRecommendResponse | null;

  setResult: (result: AiRecommendResponse | null) => void;
  reset: () => void;
}

export const useAiRecommendStore = create<AiRecommendState>((set) => ({
  result: null,

  setResult: (result) => set({ result }),
  reset: () => set({ result: null }),
}));
