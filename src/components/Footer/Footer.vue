<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<number>(new Date().getFullYear())
</script>

<template>
  <!-- footer -->
  <footer class="section">
    <p>
      Válka z okénka chatu &copy; David Pilný
      <span>{{ date }}</span>
    </p>
  </footer>
</template>

<style scoped>
footer {
  background: var(--jet);
  padding: 5rem 1rem;
}
footer p {
  color: var(--clr-white);
  text-align: center;
  text-transform: none;
  letter-spacing: var(--spacing);
  margin-bottom: 0;
}
</style>
