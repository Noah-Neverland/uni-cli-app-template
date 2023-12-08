<script lang="ts" setup>
  import { ref } from 'vue';
  const message = ref<string>('123');
</script>

<template>
  <view class="message">
    <text>{{ message }}</text>
    <view class="message-buttom"> 按钮 </view>
  </view>
</template>

<style lang="scss" scoped>
  .message {
    height: 180vh;
    position: relative;
    &-buttom {
      position: fixed;
      bottom: 0;
    }
  }
</style>
