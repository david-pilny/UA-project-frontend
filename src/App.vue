<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

import TopLink from '@core/components/top-link/index.vue'

const { t } = useI18n({ useScope: 'global' })

const title = computed(() => {
  return t('title')
})
useTitle(title)
</script>

<template>
  <router-view />
  <top-link />
</template>
