<template>
  <div class="view-body">
    <Navbar />
    <Form />
    <Footer class="footer" />
  </div>
</template>

<script>
// @ is an alias to /src
// import Body from '@/components/Body/Body.vue'
import Form from '@/components/Body/Form/Form.vue'
import Footer from '@/components/Footer/Footer.vue'
import Navbar from '@/components/Navbar.vue'
// import Header from '@/components/Header/Header.vue'
// import Preloader from '@/components/Preloader.vue'
// import TopLink from '@/components/Body/TopLink.vue'

export default {
  components: {
    Footer,
    Form,
    Navbar,
  },
}
</script>

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
