<script lang="ts" setup>
  import { AGREEMENT_KNT } from './agreement';

  const emit = defineEmits(['update:modelValue']);

  // 协议信息
  const agreementContent = computed(() => {
    return AGREEMENT_KNT[mainText.value];
  });

  const title = ref<string>('恺恩泰健康服务平台');
  const checkboxValue = ref<Array<any>>([]);
  const mainText = ref<string>('user');
  const popupRef = ref();

  onMounted(() => {
    // 判读用户是否已授权登录
    const isAgreement = uni.getStorageSync('isAgreement');
    if (isAgreement) {
      checkboxValue.value = ['agreement'];
      emit('update:modelValue', true);
    }
  });

  // 点击查看协议
  const handlerAgreement = (info: string) => {
    popupRef.value.open();
    mainText.value = info;
  };
</script>

<template>
  <view class="agreement">
    <view class="agreement-main">
      <uv-checkbox-group v-model="checkboxValue">
        <uv-checkbox
          :customStyle="{ marginTop: '2px' }"
          shape="circle"
          size="14"
          name="agreement"
          label=""
          @change="emit('update:modelValue', !checkboxValue.length)"
        />
      </uv-checkbox-group>
      <view class="agreement-main-content">
        我已阅读并同意
        <text class="agreement-main-content-text" @click="handlerAgreement('user')">
          {{ `《${title}用户协议》` }}
        </text>
        和
        <text class="agreement-main-content-text" @click="handlerAgreement('knt')">
          {{ `《${title}隐私政策》` }}
        </text>
      </view>
    </view>
    <!-- 协议 -->
    <uv-popup
      ref="popupRef"
      mode="bottom"
      closeable
      :customStyle="{ flex: 'auto', height: '100vh', overflow: 'scroll' }"
    >
      <view class="agreement-body">
        <text class="agreement-body-title">{{ agreementContent.title }}</text>
        <text class="agreement-body-p" v-for="(item, index) in agreementContent.html" :key="index">
          {{ item }}
        </text>
      </view>
    </uv-popup>
  </view>
</template>

<style lang="scss" scoped>
  .agreement {
    &-main {
      display: flex;
      align-items: flex-start;
      width: 90%;
      margin: auto;

      &-content {
        font-size: 26rpx;
        color: #94a4b7;
        margin-left: 4rpx;
        text-align: justify;
        &-text {
          color: $uni-color-primary;
        }
      }
    }

    &-body {
      margin-top: 40rpx;
      min-height: 100vh;
      overflow: scroll;
      font-size: 28rpx;
      width: 90%;
      margin: auto;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;

      &-title {
        text-align: center;
        font-weight: bold;
        margin: 40rpx 0;
        display: block;
      }

      &-p {
        color: #303a49;
        line-height: 40rpx;
        font-size: 24rpx;
        margin-bottom: 20rpx;
        display: block;
      }
    }
  }
</style>
