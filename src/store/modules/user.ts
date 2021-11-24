import { defineStore } from 'pinia';
import { store } from '../index';

interface UserState {
  token?: string;
}


export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
  }),
  getters: {
    getToken(): string {
      return this.token || ''
    }
  },
  actions: {
    setToken(info: string) {
      this.token = info
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}