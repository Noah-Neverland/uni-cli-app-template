import { BASE_URL } from '@/config/base';
import { toast } from '@/utils/utils';
import { ResultEnum } from '@/enums/httpEnum';
import { useUserStoreWithOut } from '@/store/modules/user';
import RequestManager from './requestManager';

type METHOD = 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

const manager = new RequestManager();

const baseRequest = async (
  url: string,
  method: METHOD,
  data = {},
  customError = false,
  loading = true,
) => {
  const requestId = manager.generateId(method, url, data);
  if (!requestId) return false;
  const userStore = useUserStoreWithOut();
  const header: any = {};
  header.token = userStore.getToken || '';
  return new Promise((reslove, reject) => {
    loading &&
      uni.showLoading({
        title: '加载中...',
      });
    uni.request({
      url: BASE_URL + url,
      method: method || 'GET',
      header: header,
      timeout: 10000,
      data: data || {},
      complete: () => {
        uni.hideLoading();
        manager.deleteById(requestId);
      },
      success: (successData) => {
        const res: any = successData.data;
        if (!res) return toast('请求出错，请稍候重试');
        const { code, data, message } = res;
        const hasSuccess = res && Reflect.has(res, 'code') && code === ResultEnum.SUCCESS;
        if (hasSuccess) return reslove(data);
        switch (code) {
          case ResultEnum.ACCESSDENIED:
            userStore.setToken(undefined);
            userStore.logout(true);
            break;
          default:
            toast(message || '网络连接失败，请稍后重试');
            customError && reject(message);
            break;
        }
      },
      fail: (msg) => {
        toast(msg.errMsg || '网络连接失败，请稍后重试');
        customError && reject(msg);
      },
    });
  });
};

const request: any = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method: any) => {
  request[method] = (api: string, data: any, customError: boolean, loading: boolean) =>
    baseRequest(api, method, data, customError, loading);
});

export default request;
