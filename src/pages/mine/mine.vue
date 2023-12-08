<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  const headimgurl = computed(() => {
    return userStore.getUserInfo.userThird.headimgurl || '';
  });

  const userName = computed(() => {
    return userStore.getUserInfo.userBase.name || '';
  });
</script>

<template>
  <view class="mine">
    <view class="mine-head">
      <view class="mine-head-content">
        <uv-image width="100rpx" height="100rpx" :src="headimgurl" mode="widthFix" shape="circle" />
        <text style="margin-left: 24rpx">{{ userName }}</text>
      </view>
    </view>
    <uv-cell-group
      :border="false"
      :customStyle="{
        backgroundColor: 'white',
        margin: '-100rpx 20rpx 0 20rpx',
        borderRadius: '20rpx',
      }"
    >
      <uv-cell
        icon="/static/mine/me_icon_01.png"
        title="账号设置"
        :cellStyle="{ padding: '40rpx 30rpx' }"
        :isLink="true"
        arrow-direction="right"
        url="/subpages/settings/account/account"
      />
      <uv-cell
        icon="/static/mine/me_icon_02.png"
        title="消息订阅"
        :cellStyle="{ padding: '40rpx 30rpx' }"
        :isLink="true"
        :border="false"
        arrow-direction="right"
        url="/subpages/settings/subscription/subscription"
      />
    </uv-cell-group>
  </view>
</template>

<style lang="scss" scoped>
  .mine {
    &-head {
      width: 100%;
      height: 300rpx;
      background: url('/static/mine/bg.png') no-repeat center;
      background-size: contain;
      &-content {
        display: flex;
        align-items: center;
        padding: 45rpx 0 0 48rpx;
      }
    }
  }
</style>
