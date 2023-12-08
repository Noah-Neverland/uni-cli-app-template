<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <!-- <navigator url="/subpages/login/login" open-type="navigate"></navigator> -->
      <button @click="go">去登录</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { useRouter } from '@/utils/utils';
  // import { useUserStore } from '@/store/modules/user';

  // const userStore = useUserStore();
  const title = ref('Heeeeee');

  const go = () => {
    useRouter('/subpages/login/login');
    // uni.redirectTo({ url: '/subpages/login/login' });
  };

  onShow(() => {
    // const userInfo = userStore.getUserInfo;
    // const token = userStore.getToken;
    // console.log('userInfo===', userInfo);
    // console.log('token===', token);
  });
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
