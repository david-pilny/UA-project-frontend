<template>
  <!-- footer -->
  <footer class="section">
    <p>
      Válka z okénka chatu &copy; David Pilný
      <span>{{ date }}</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  data() {
    return {
      date: '',
    }
  },
  
  mounted() {
    this.date = new Date().getFullYear()
  },
}
</script>

<style scoped>
footer {
  background: var(--clr-grey-1);
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
