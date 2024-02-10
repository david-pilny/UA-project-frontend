<script lang="ts" setup>
import { ref } from 'vue'

import CarouselItem from './components/CarouselItem.vue'
import CarouselControls from './components/CarouselControls.vue'
import CarouselIndicators from './components/CarouselIndicators.vue'
import { CarouselProps, DirectionTypes } from './models'

const { controls, indicators, interval, slides } = withDefaults(
  defineProps<CarouselProps>(),
  {
    controls: false,
    indicators: false,
    interval: 86400000,
  }
)

const currentSlide = ref<number>(0)
const slideInterval = ref()
const direction = ref<DirectionTypes>('right')

const setCurrentSlide = (index: number) => {
  currentSlide.value = index
}

const _next = (step = 1) => {
  const index =
    currentSlide.value < slides.length - 1 ? currentSlide.value + step : 0
  setCurrentSlide(index)
  direction.value = 'right'
}

const previousSlide = (step = -1) => {
  const index =
    currentSlide.value > 0 ? currentSlide.value + step : slides.length - 1
  setCurrentSlide(index)
  direction.value = 'left'
  startSlideTimer()
}

const nextSlide = (step = 1) => {
  _next(step)
  startSlideTimer()
}

const startSlideTimer = () => {
  stopSlideTimer()
  slideInterval.value = setInterval(() => {
    _next()
  }, interval)
}

const stopSlideTimer = () => {
  clearInterval(slideInterval.value)
}

const switchSlide = (index: number) => {
  const step = index - currentSlide.value
  step > 0 ? nextSlide(step) : previousSlide(step)
}
</script>

<template>
  <div class="carousel">
    <div class="carousel-inner">
      <carousel-indicators
        v-if="indicators"
        :total="slides.length"
        :current-index="currentSlide"
        @switch="switchSlide($event)"
      ></carousel-indicators>

      <carousel-item
        v-for="(slide, index) in slides"
        :slide="slide"
        :key="`item-${index}`"
        :current-slide="currentSlide"
        :index="index"
        :direction="direction"
        @mouseenter="stopSlideTimer"
        @mouseout="startSlideTimer"
      ></carousel-item>

      <carousel-controls
        v-if="controls"
        @prev="previousSlide"
        @next="nextSlide"
      ></carousel-controls>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  border: 5px solid var(--gray);
  width: 50vw;
  height: 70vw;
  margin: 0 auto;
  max-width: 80rem;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-top: 1rem;
}
.carousel-inner {
  /* position: relative;
  width: 900px;
  height: 400px;
  overflow: hidden; */

  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--clr-primary-9);
  color: var(--clr-white);
  display: grid;
  place-items: center;
  transition: all 0.25s ease-in-out;
  text-align: center;
}
</style>
