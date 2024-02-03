// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'

import i18n from '@core/services/i18n'

import App from './App.vue'
import router from './router'

createApp(App).use(i18n).use(router).mount('#app')
