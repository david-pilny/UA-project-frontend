<script lang="ts" setup>
import { computed } from 'vue'

import { CarouselItemProps, TransitionEffect } from '../models'

const emit = defineEmits(['mouseenter', 'mouseout'])
const props = defineProps<CarouselItemProps>()

const transitionEffect = computed<TransitionEffect>(() => {
  return props.direction === 'right' ? 'slide-out' : 'slide-in'
})
</script>

<template>
  <transition :name="transitionEffect">
    <div
      class="carousel-item"
      v-show="currentSlide === index"
      @mouseenter="emit('mouseenter')"
      @mouseout="emit('mouseout')"
    >
      <img v-lazy="slide" />
    </div>
  </transition>
</template>

<style scoped>
.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slide-in-enter-active,
.slide-in-leave-active,
.slide-out-enter-active,
.slide-out-leave-active {
  transition: all 1s ease-in-out;
}
.slide-in-enter-from {
  transform: translateX(-100%);
}
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-out-enter-from {
  transform: translateX(100%);
}
.slide-out-leave-to {
  transform: translateX(-100%);
}
</style>
