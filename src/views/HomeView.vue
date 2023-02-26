<template>
  <Header />
  <Body />
  <TopLink />
  <Footer />
  <Preloader v-if="loading" />
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header/Header.vue'
import Body from '@/components/Body/Body.vue'
import TopLink from '@/components/Body/TopLink.vue'
import Footer from '@/components/Footer/Footer.vue'
import Preloader from '@/components/Preloader.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      loading: true,
    }
  },
  components: {
    Header,
    Body,
    TopLink,
    Footer,
    Preloader,
  },
  mounted() {
    window.addEventListener('load', () => (this.loading = false))
  },
}
</script>
