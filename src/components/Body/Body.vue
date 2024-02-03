<template>
  <div>
    <About />
    <Format />
  </div>
</template>

<script>
import About from '@/components/Body/About/About.vue'
import Format from '@/components/Body/Format/Format.vue'

export default {
  name: 'Body',

  components: {
    About,
    Format,
  },
}
</script>
