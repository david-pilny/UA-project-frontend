<script setup>
import Form from '@/components/Body/Form/Form.vue'
import Footer from '@core/components/footer/index.vue'
import Navbar from '@core/components/navbar/index.vue'
</script>

<template>
  <div class="view-body">
    <Navbar />
    <Form />
    <Footer class="footer" />
  </div>
</template>

<style scoped>
.view-body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.footer {
  margin-top: auto;
}
</style>
