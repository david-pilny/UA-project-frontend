// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

router.beforeEach((to, from, next) => {
  // use the language from the routing param or default language
  let language = to.params.lang
  if (!language) {
    language = 'en'
  }
  // set the current language for i18n.
  i18n.global.locale = language
  next()
})

createApp(App).use(i18n).use(router).mount('#app')
