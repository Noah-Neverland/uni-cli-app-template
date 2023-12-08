// @ts-nocheck

import { ENV_TYPE } from './index';

type ENVTYPE = 'develop' | 'release' | 'trial' | '';

let ENV: ENVTYPE = ''; // 获取小程序运行环境

// #ifdef MP-WEIXIN
ENV = __wxConfig.envVersion;
// #endif

const BASE_PROXY = '/zeus';
const BASE_API_PROXY = '/api';
const BASE_URL = ENV_TYPE[ENV]?.BASE_URL || '';
const WEBVIEW_URL = ENV_TYPE[ENV]?.WEBVIEW_URL || '';

export { BASE_PROXY, BASE_API_PROXY, BASE_URL, WEBVIEW_URL };
