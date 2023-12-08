<script lang="ts" setup>
  import { wxLogin } from '@/api/common';
  import AgreementComponent from './lib/agreement.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useRouter } from '@/utils/utils';

  const userStore = useUserStore();

  const title = ref<string>('云工作室');
  const checked = ref<boolean>(false);
  const code = ref();

  onMounted(() => {
    uni.login({
      success: (res) => {
        code.value = res.code;
      },
    });
  });

  const handleLogin = async (info: any) => {
    const { nickName, avatarUrl, gender, province, city, country } = info.userInfo;
    const params = {
      code: code.value,
      appletUserResponse: {
        nickname: nickName,
        sex: gender,
        province,
        city,
        country,
        headimgurl: avatarUrl,
      },
    };
    const result = await wxLogin(params);
    // 保存用户信息
    userStore.setUserInfo(result.redisUser);
    // 保存token
    userStore.setToken(result.token);
    // 保存studioId
    uni.setStorageSync('isAgreement', true);
    // 登录成功 跳转首页
    useRouter('/pages/index/index', 'switchTab');
  };

  const onWxLogin = () => {
    uni.getUserProfile({
      desc: 'Wexin', // 这个参数是必须的
      success: (infoRes) => {
        handleLogin(infoRes);
      },
    });
  };
</script>

<template>
  <view class="login">
    <!-- login头部信息 -->
    <view class="login-head">
      <view class="login-head-logo">
        <image class="login-head-logo-img" src="/static/logo.png" mod="aspectFit" />
      </view>
      <text>{{ title }}</text>
    </view>
    <!-- login按钮 -->
    <view class="login-buttons">
      <uv-button
        shape="circle"
        @click="onWxLogin"
        color="#07c160"
        text="一键登录"
        :disabled="!checked"
      />
    </view>
    <!-- login协议 -->
    <AgreementComponent v-model="checked" />
  </view>
</template>

<style lang="scss" scoped>
  .login {
    &-head {
      padding: 0 0 100rpx 0;
      margin-top: 100rpx;
      text-align: center;

      &-logo {
        &-img {
          width: 252rpx;
          height: 252rpx;
          margin: 60rpx 0 30rpx 0;
        }
      }
    }

    &-buttons {
      width: 90%;
      margin: auto;
      margin-bottom: 30rpx;
    }
  }
</style>
