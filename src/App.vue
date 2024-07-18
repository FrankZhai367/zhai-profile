<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import Profile from './components/profile/index.vue';
import VErrorBoundary from 'vue-error-boundary';
</script>

<template>
  <VErrorBoundary>
    <div class="min-h-screen w-[100vw] bg-gradient-to-r from-purple-600 to-blue-300 flex items-center">
      <Profile />
    </div>
  </VErrorBoundary>
</template>

<style scoped></style>
