import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { createSelectors } from './createSelectors';

interface UserState {
  username: string;
  setUsername: (username: string) => void;
}

const useUserStoreBase = create(
  persist<UserState>(
    (set) => ({
      username: 'crew member',
      setUsername: (username) => set({ username }),
    }),
    {
      name: '@liftoff-user-store',
      getStorage: () => AsyncStorage,
    }
  )
);

export const useUserStore = createSelectors(useUserStoreBase);
