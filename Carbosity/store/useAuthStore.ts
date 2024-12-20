import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { persist } from 'zustand/middleware';
import { User } from '@/types/User';

const mmkvStorage = new MMKV();

const storage = {
  getItem: (key: string) => {
    const value = mmkvStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    mmkvStorage.set(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    mmkvStorage.delete(key);
  },
};

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isWelcomed: boolean;
  setIsWelcomed: (isWelcomed: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          set({ isLoggedIn, token: null, user: null, isWelcomed: false });
        } else {
          set({ isLoggedIn });
        }
      },
      isWelcomed: false,
      setIsWelcomed: (isWelcomed: boolean) => set({ isWelcomed }),
      token: null,
      setToken: (token: string) => set({ token, isLoggedIn: true, isWelcomed: true }),
      user: null,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage,
    }
  )
);

export default useAuthStore;
