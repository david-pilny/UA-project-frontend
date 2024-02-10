<script setup>
import Navbar from '@core/components/navbar/index.vue'
import Banner from './components/Banner.vue'
</script>

<template>
  <!-- header -->
  <header id="home">
    <Navbar home />
    <Banner />
  </header>
</template>

<style scoped>
header {
  min-height: 100vh;
  background:
    linear-gradient(rgba(173, 224, 226, 0.5), rgba(0, 0, 0, 0.7)),
    url(@/media/hero_pic.jpg) center/cover no-repeat;
}
</style>
