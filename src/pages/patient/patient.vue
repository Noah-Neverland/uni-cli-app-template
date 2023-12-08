<script lang="ts" setup>
  import { ref } from 'vue';
  const message = ref<string>('');
</script>

<template>
  <view>{{ message }}</view>
</template>
