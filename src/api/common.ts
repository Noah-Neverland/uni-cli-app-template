import request from '@/utils/request/request';

// 微信登录
export const wxLogin = (data: any) => request.post('/studio-doctor/wxLogin', data);

// 登出
export const LoginOut = () => request.get('/studio-doctor/loginOut');
