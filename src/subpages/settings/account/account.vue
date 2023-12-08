<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();

  const modalRef = ref();

  const phone = computed(() => {
    return userStore.getUserInfo.userBase.phone || '';
  });

  const onConfirm = () => {
    userStore.setToken(undefined);
    userStore.logout(true);
  };
</script>

<template>
  <view>
    <uv-cell-group
      :border="false"
      :customStyle="{
        backgroundColor: 'white',
        marginBottom: '20rpx',
      }"
    >
      <uv-cell title="手机号" :border="false" :value="phone" :isLink="false" />
    </uv-cell-group>
    <uv-button customTextStyle="color: red" size="large" text="退出登录" @click="modalRef.open()" />

    <uv-modal
      ref="modalRef"
      width="560rpx"
      title="提示"
      content="点击确认，退出登录！"
      align="center"
      :showCancelButton="true"
      :closeOnClickOverlay="false"
      @confirm="onConfirm"
    />
  </view>
</template>
