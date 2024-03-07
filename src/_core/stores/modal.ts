import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => {
    return { show: false }
  },
  actions: {
    close() {
      document.body.classList.remove('modal-open')
      this.show = false
    },
    open() {
      document.body.classList.add('modal-open')
      this.show = true
    },
  },
})
