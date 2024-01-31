<template>
  <!-- services -->
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
      require('@/media/Nikopol_Chat.png'),
      require('@/media/model_pic_page_1.jpg'),
    ],
  }),
}
</script>

<style scoped>
h2 {
  /* color: var(--clr-jet); */
  color: var(--clr-glaucous);
}
</style>
