<script lang="ts" setup>
  import { ref } from 'vue';
  const message = ref<string>('消息订阅');
</script>

<template>
  <div>{{ message }}</div>
</template>
