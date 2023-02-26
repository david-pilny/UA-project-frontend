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
        @prev="prev"
        @next="next"
      ></carousel-controls>
    </div>
  </div>
</template>

<script>
import CarouselItem from './CarouselItem.vue'
import CarouselControls from './CarouselControls.vue'
import CarouselIndicators from './CarouselIndicators.vue'

export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    indicators: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 86400000,
    },
  },
  components: { CarouselItem, CarouselControls, CarouselIndicators },
  data: () => ({
    currentSlide: 0,
    slideInterval: null,
    direction: 'right',
  }),
  methods: {
    setCurrentSlide(index) {
      this.currentSlide = index
    },
    prev(step = -1) {
      const index =
        this.currentSlide > 0
          ? this.currentSlide + step
          : this.slides.length - 1
      this.setCurrentSlide(index)
      this.direction = 'left'
      this.startSlideTimer()
    },
    _next(step = 1) {
      const index =
        this.currentSlide < this.slides.length - 1
          ? this.currentSlide + step
          : 0
      this.setCurrentSlide(index)
      this.direction = 'right'
    },
    next(step = 1) {
      this._next(step)
      this.startSlideTimer()
    },
    startSlideTimer() {
      this.stopSlideTimer()
      this.slideInterval = setInterval(() => {
        this._next()
      }, this.interval)
    },
    stopSlideTimer() {
      clearInterval(this.slideInterval)
    },
    switchSlide(index) {
      const step = index - this.currentSlide
      if (step > 0) {
        this.next(step)
      } else {
        this.prev(step)
      }
    },
  },
  mounted() {
    this.startSlideTimer()
  },
  beforeUnmount() {
    this.stopSlideTimer()
  },
}
</script>

<style scoped>
.carousel {
  display: flex;
  justify-content: center;
  border: 5px solid var(--clr-primary-4);
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
