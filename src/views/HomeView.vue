<script setup>
import { ref } from 'vue'

import Body from '@/components/Body/Body.vue'
import Footer from '@core/components/footer/index.vue'
import Form from '@/components/Body/Form/index.vue'
import Header from '@/components/Header/index.vue'
import { useModalStore } from '@stores/modal'

const modal = useModalStore()
</script>

<template>
  <Header />
  <Body />
  <Transition>
    <Form v-if="modal.show" />
  </Transition>
  <Footer />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
