<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'

type LinkStatus = 'show-link' | ''

const topLink = ref<LinkStatus>('')

const handleScroll = debounce(() => {
  const scrollHeight = window.pageYOffset
  const navElement = document.getElementById('nav')
  const navHeight = navElement?.getBoundingClientRect().height || 0

  topLink.value = scrollHeight > navHeight ? 'show-link' : ''
}, 100)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- back to top button -->
  <a href="#home" :class="`scroll-link top-link ${topLink}`">
    <i class="fas fa-arrow-up"></i>
  </a>
</template>

<style scoped>
.top-link {
  font-size: 1.25rem;
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  background: var(--davys-gray);
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
  border-radius: var(--radius);
  color: var(--white-smoke);
  animation: bounce 2s ease-in-out infinite;
  visibility: hidden;
  transition: visibility 0.3s ease;
  z-index: -100;
}
.show-link {
  visibility: visible;
  z-index: 100;
}
</style>
