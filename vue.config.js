const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, '../server/public'),

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },

  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src/_core'),
      },
    },
  },
})
