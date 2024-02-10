<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { ref, onMounted, onUnmounted } from 'vue'

const topLink = ref<'show-link' | ''>('')

const handleScroll = debounce(() => {
  const scrollHeight = window.pageYOffset
  const navElement = document.getElementById('nav')
  const navHeight = navElement?.getBoundingClientRect().height || 0

  topLink.value = scrollHeight > navHeight ? 'show-link' : ''
}, 100)

const handleClick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- back to top button -->
  <div :class="`scroll-link top-link ${topLink}`" @click="handleClick">
    <i class="fas fa-arrow-up"></i>
  </div>
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
.top-link:hover {
  cursor: pointer;
}
.show-link {
  visibility: visible;
  z-index: 100;
}
</style>
