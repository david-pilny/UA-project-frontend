<template>
  <div>
    <Header />
    <Body />
    <TopLink />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Body from '@/components/Body/Body.vue'
import Footer from '@/components/Footer/Footer.vue'
import Header from '@/components/Header/Header.vue'
import TopLink from '@/components/Body/TopLink.vue'

export default {
  components: {
    Body,
    Footer,
    Header,
    TopLink,
  },
}
</script>
