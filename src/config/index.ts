// 区分运行环境
export const ENV_TYPE: any = {
  develop: {
    WEBVIEW_URL: 'http://localhost:8080/studio/doctor',
    BASE_URL: (() => {
      // #ifdef MP-WEIXIN
      return 'https://test-medical.caetar.com';
      // #endif
    })(),
  }, // 开发环境
  release: {
    WEBVIEW_URL: 'https://medical.caetar.com/studio/doctor',
    BASE_URL: (() => {
      // #ifdef MP-WEIXIN
      return 'https://medical.caetar.com';
      // #endif
    })(),
  }, // 正式环境
  trial: {
    WEBVIEW_URL: 'https://test-medical.caetar.com/studio/doctor',
    BASE_URL: (() => {
      // #ifdef MP-WEIXIN
      return 'https://test-medical.caetar.com';
      // #endif
    })(),
  }, // 体验环境
};
