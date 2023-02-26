<template>
  <!-- header -->
  <header id="home">
    <Navbar />
    <Banner />
  </header>
</template>

<script>
import Navbar from '@/components/Header/Navbar.vue'
import Banner from '@/components/Header/Banner.vue'

export default {
  name: 'Header',
  components: {
    Navbar,
    Banner,
  },
}
</script>

<style scoped>
header {
  min-height: 100vh;
  background: linear-gradient(rgba(173, 224, 226, 0.5), rgba(0, 0, 0, 0.7)),
    url(@/media/hero_pic.jpg) center/cover no-repeat;
}
</style>
