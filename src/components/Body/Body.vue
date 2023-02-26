<template>
  <About />
  <Format />
  <Form />
</template>

<script>
import About from '@/components/Body/About/About.vue'
import Format from '@/components/Body/Format/Format.vue'
import Form from '@/components/Body/Form/Form.vue'

export default {
  name: 'Body',
  components: {
    About,
    Format,
    Form,
  },
}
</script>
