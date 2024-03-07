<script setup>
import { useModalStore } from '@stores/modal'

const modal = useModalStore()
</script>

<template>
  <!-- banner -->
  <div class="banner">
    <div class="container">
      <h1>{{ $t('header.banner.title') }}</h1>
      <p>
        {{ $t('header.banner.description') }}
      </p>
      <div class="scroll-link btn btn-white" @click="() => modal.open()">
        {{ $t('header.banner.button') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>
