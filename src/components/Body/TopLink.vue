<template>
  <!-- back to top button -->
  <a href="#home" class="scroll-link top-link" ref="topLink">
    <i class="fas fa-arrow-up"></i>
  </a>
</template>

<script>
export default {
  name: 'TopLink',
  data() {
    return {
      topLink: '',
      nav: '',
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      const scrollHeight = window.pageYOffset
      const navHeight = this.nav.getBoundingClientRect().height

      if (scrollHeight > navHeight) {
        // this.nav.classList.add('fixed-nav')
        this.topLink.classList.add('show-link')
      } else {
        // this.nav.classList.remove('fixed-nav')
        this.topLink.classList.remove('show-link')
      }
    },
  },
  mounted() {
    this.topLink = this.$refs.topLink
    this.nav = document.getElementById('nav')
  },
}
</script>

<style scoped>
.top-link {
  font-size: 1.25rem;
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background: var(--clr-secondary);
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border-radius: var(--radius);
  color: var(--clr-white);
  animation: bounce 2s ease-in-out infinite;

  visibility: hidden;
  z-index: -100;
}
.show-link {
  visibility: visible;
  z-index: 100;
}
</style>
