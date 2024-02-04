import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'

import i18n from '@core/services/i18n'

import { firebaseApp } from './firebase.js'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .use(i18n)
  .use(router)
  .mount('#app')
