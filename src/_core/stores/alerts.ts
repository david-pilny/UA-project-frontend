import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alerts', {
  state: () => {
    return {
      errorAlert: false,
      errorMessage: '',
      successAlert: false,
      successMessage: '',
    }
  },
  actions: {
    showErrorAlert(message: string) {
      this.errorAlert = true
      this.errorMessage = message
      this._errorCountdown()
    },

    hideErrorAlert() {
      this.errorAlert = false
      this.errorMessage = ''
    },

    showSuccessAlert(message: string) {
      this.successAlert = true
      this.successMessage = message
      this._countdown()
    },

    hideSuccessAlert() {
      this.successAlert = false
      this.successMessage = ''
    },

    _errorCountdown() {
      setTimeout(() => {
        this.hideErrorAlert()
      }, 10000)
    },

    _successCountdown() {
      setTimeout(() => {
        this.hideSuccessAlert()
      }, 10000)
    },
  },
})
