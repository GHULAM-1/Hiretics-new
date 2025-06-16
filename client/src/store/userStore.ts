import { create } from 'zustand';

interface UserState {
  email: string | null;
  displayName: string | null;
  setUser: (email: string | null, displayName: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: null,
  displayName: null,
  setUser: (email, displayName) => set({ email, displayName }),
  clearUser: () => set({ email: null, displayName: null }),
})); 