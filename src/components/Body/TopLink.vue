<template>
  <!-- back to top button -->
  <a href="#home" :class="`scroll-link top-link ${topLink}`">
    <i class="fas fa-arrow-up"></i>
  </a>
</template>

<script>
export default {
  name: 'TopLink',
  
  data() {
    return {
      navbar: '',
      topLink: ''
    }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll)
  },

  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  
  methods: {
    handleScroll() {
      const scrollHeight = window.pageYOffset
      const navHeight = document.getElementById('nav').getBoundingClientRect().height

      if (scrollHeight > navHeight) {
        this.topLink = 'show-link'
        return
      } 
      this.topLink = ''
    },
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
