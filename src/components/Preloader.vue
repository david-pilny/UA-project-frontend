<template>
  <div class="preloader" v-if="loading">
    <img :src="preloaderGif" alt="preloader" />
  </div>
</template>

<script>
const preloader = document.querySelector('.preloader')

// window.addEventListener('load', () => {
//   preloader.classList.add('hide-preloader')
// })
export default {
  name: 'Preloader',
  data() {
    return {
      preloaderGif: require('@/assets/preloader.gif'),
      loading: true,
    }
  },
  mounted() {
    window.addEventListener('load', () => (this.loading = false))
  },
}
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--clr-white);
  display: grid;
  justify-content: center;
  align-items: center;
  visibility: visible;
  z-index: 9999999999999999;
  transition: var(--transition);
}
.hide-preloader {
  z-index: -9999999999999999;
  visibility: hidden;
}
</style>
