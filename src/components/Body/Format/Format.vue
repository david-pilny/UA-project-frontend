<template>
  <!-- format -->
  <section id="format" class="section">
    <div class="title">
      <h2>{{ $t('body.format.title') }}</h2>
    </div>

    <div class="note note-primary">
      <p>
        {{ $t('body.format.description.firstParagraph') }}
      </p>
      <p>
        {{ $t('body.format.description.secondParagraph') }}
      </p>
      <p>
        {{ $t('body.format.description.thirdParagraph') }}
      </p>
    </div>

    <carousel :slides="slides" controls indicators></carousel>
  </section>
</template>

<script>
import Carousel from '@/components/Body/Format/Carousel.vue'

export default {
  components: { Carousel },
  data: () => ({
    slides: [
      new URL('@/media/Nikopol_Chat.png', import.meta.url).href,
      new URL('@/media/model_pic_page_1.jpg', import.meta.url).href,
    ],
  }),
}
</script>

<style scoped></style>
