import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import VueLazyload from 'vue-lazyload'

import i18n from '@core/services/i18n'

import '../styles.css'
import { firebaseApp } from './firebase.js'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .use(createPinia())
  .use(VueLazyload)
  .use(i18n)
  .use(router)
  .mount('#app')
