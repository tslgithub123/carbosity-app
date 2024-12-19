import { create } from 'zustand';
import { MMKV } from 'react-native-mmkv';
import { persist } from 'zustand/middleware';
import { User } from '@/types/User';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const storage = {
  getItem: (key: string) => {
    const value = new MMKV().getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    new MMKV().set(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    new MMKV().delete(key);
  },
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
    }),
    {
      name: 'user-storage',
      storage: storage,
    }
  )
);

export default useAuthStore;