import { create } from 'zustand';

type OnboardingState = {
  kakaoId: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
};

type OnboardingStore = {
  onboardingUser: OnboardingState | null;
  setOnboardingUser: (data: OnboardingState) => void;
  updatePhoneNumber: (phone: string) => void;
  clearOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  onboardingUser: null,

  setOnboardingUser: (data) => set({ onboardingUser: data }),

  updatePhoneNumber: (phone) =>
    set((state) =>
      state.onboardingUser
        ? {
            onboardingUser: {
              ...state.onboardingUser,
              phoneNumber: phone,
            },
          }
        : state,
    ),

  clearOnboarding: () => set({ onboardingUser: null }),
}));
