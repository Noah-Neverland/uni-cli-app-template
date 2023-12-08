import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { clearStorageSync, useRouter } from '@/utils/utils';
import { LoginOut } from '@/api/common';

interface UserState {
  userInfo: UserInfo; // 用户信息
  token: string | undefined | null; // token
  studioId: number | undefined | null; // 工作室id
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => {
    return {
      userInfo: {
        userBase: {},
        userThird: {},
      },
      token: null,
      studioId: null,
    };
  },
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || {};
    },
    getToken(): string {
      return this.token || '';
    },
  },
  actions: {
    // 设置用户信息
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    // 设置token
    setToken(info: string | undefined) {
      this.token = info ?? '';
    },
    // 设置当前工作室id
    setStudioId(info: number | undefined) {
      this.studioId = info;
    },
    // 重置state
    resetState() {
      this.userInfo = {
        userBase: {},
        userThird: {},
      };
      this.token = '';
      this.studioId = null;
    },
    // 退出
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await LoginOut();
        } catch (error) {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo({ userBase: {}, userThird: {} });
      this.setToken(undefined);
      this.setStudioId(undefined);
      clearStorageSync();
      goLogin && useRouter('/subpages/login/login', 'reLaunch');
    },
  },
  unistorage: true, // 用于pinia数据持久缓存
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
