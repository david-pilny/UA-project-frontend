<template>
  <!-- banner -->
  <div class="banner">
    <div class="container">
      <h1>{{ $t('header.banner.title') }}</h1>
      <p>
        {{ $t('header.banner.description') }}
      </p>
      <a href="#form" class="scroll-link btn btn-white">{{
        $t('header.banner.button')
      }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
}
</script>

<style scoped>
.banner {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>
