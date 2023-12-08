# uni-cli-app-template

通过vue-cli命令行安装的uni-app项目开发模版

## 运行项目

1. 安装依赖（建议使用yarn or npm,不要使用pnpm）

   ```js
   yarn install
   ```

2. 运行到微信小程序（其它平台更改运行平台的名称，package.json可查询或者uni-app官网）

   ```js
   yarn run dev:mp-weixin
   ```

3. 打开微信小程序开发工具，选择导入项目，选择/dist/dev/mp-weixin目录。（appid切换成自己的）

## 技术栈

- [uni-app](https://uniapp.dcloud.net.cn/)
- [vue3](https://v3.cn.vuejs.org/)
- [typescript](https://www.typescriptlang.org/zh/)
- [uvui](https://www.uvui.cn/)
- [pinia](https://pinia.web3doc.top/introduction.html)
- [pinia-plugin-unistorage](https://www.npmjs.com/package/pinia-plugin-unistorage)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/design/)
