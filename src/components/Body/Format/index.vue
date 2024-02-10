<script lang="ts" setup>
import { ref } from 'vue'

import Carousel from '@core/components/carousel/index.vue'

const slides = ref<string[]>([
  new URL('@/media/Nikopol_Chat.png', import.meta.url).href,
  new URL('@/media/model_pic_page_1.jpg', import.meta.url).href,
])
</script>

<template>
  <!-- format -->
  <section id="format" class="section">
    <div class="title">
      <h2>{{ $t('body.format.title') }}</h2>
    </div>

    <div class="note note-primary">
      <p>
        {{ $t('body.format.description.paragraphs.first') }}
      </p>
      <p>
        {{ $t('body.format.description.paragraphs.second') }}
      </p>
      <p>
        {{ $t('body.format.description.paragraphs.first') }}
      </p>
    </div>

    <carousel :slides="slides" controls indicators></carousel>
  </section>
</template>
