<script setup>
import Navbar from './Navbar.vue'
import Banner from './Banner.vue'
</script>

<template>
  <!-- header -->
  <header id="home">
    <Navbar />
    <Banner />
  </header>
</template>

<style scoped>
header {
  min-height: 100vh;
  background: linear-gradient(rgba(173, 224, 226, 0.5), rgba(0, 0, 0, 0.7)),
    url(@/media/hero_pic.jpg) center/cover no-repeat;
}
</style>
