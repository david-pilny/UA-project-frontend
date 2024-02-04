import { createI18n } from 'vue-i18n'

function loadLocaleMessages() {
  const locales = import.meta.globEager('../../locales/*.json')
  const messages = {}

  Object.keys(locales).forEach((key) => {
    const matched = key.match(/\/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales[key].default
    }
  })

  return messages
}

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
})
