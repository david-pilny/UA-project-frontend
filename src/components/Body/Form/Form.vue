<template>
  <!-- tours -->
  <section id="tours" class="section">
    <div class="title">
      <h2>sdílejte svůj příběh</h2>
    </div>

    <div>
      <form class="form file-form" onkeydown="return event.key != 'Enter';">
        <!-- single row -->
        <div class="form-row">
          <label for="email" class="form-label">Email (nepovinné)</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="form-input"
          />
        </div>
        <!-- end of single row -->

        <!-- single row -->
        <div class="form-row">
          <label for="description" class="form-label"
            >Popiště pár slovy, co se v den konverzace dělo:</label
          >
          <!-- <input type="text" id="price" class="form-input" > -->
          <textarea
            name="desc"
            class="form-input"
            id="desc"
            cols="20"
            rows="10"
            v-model="desc"
          ></textarea>
        </div>
        <!-- end of single row -->

        <!-- single row -->
        <div class="form-row">
          <label for="image" class="form-label"
            >Nahrajte screenshot/y konverzace</label
          >

          <file-pond
            name="screenShotPic"
            ref="pond"
            label-idle="Drop files here..."
            v-bind:allow-multiple="true"
            accepted-file-types="image/jpeg, image/png"
            v-on:init="handleFilePondInit"
          />
        </div>
        <!-- end of single row -->

        <!-- single row -->
        <div class="form-row">
          <input type="checkbox" id="agree" name="agree" v-model="checked" />
          <label for="agree">
            Souhlasím s použitím sdílených informací v knize</label
          >
        </div>
        <!-- end of single row -->

        <button
          type="submit"
          class="btn btn-block share-btn"
          @click="submitForm"
        >
          Share
        </button>
      </form>
    </div>

    <Modal @close="toggleModal" :modalActive="modalActive">
      <DefaultModalContent v-if="loading" />
      <ModalSuccess v-if="success" />
      <ModalBadTypeFile v-if="badFileType" />
    </Modal>
  </section>
</template>

<script>
import ApiService from '@/ApiService'
import Modal from '@/components/Body/Form/Modal.vue'
import DefaultModalContent from '@/components/Body/Form/DefaultModalContent.vue'
import ModalSuccess from '@/components/Body/Form/ModalSuccess.vue'
import ModalBadTypeFile from '@/components/Body/Form/ModalBadTypeFile.vue'
import { ref } from 'vue'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
)

export default {
  name: 'Form',
  components: {
    Modal,
    DefaultModalContent,
    FilePond,
    ModalSuccess,
    ModalBadTypeFile,
  },
  
  data() {
    return {
      email: '',
      desc: '',
      checked: false,
      loading: false,
      success: false,
      badFileType: false,
    }
  },

  setup() {
    const modalActive = ref(false)

    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }
    return { modalActive, toggleModal }
  },

  mounted() {},

  methods: {
    handleFilePondInit: function () {
      console.log('FilePond has initialized')
    },

    startLoading() {
      this.loading = true
      this.success = false
      this.badFileType = false
    },

    showSuccess() {
      this.success = true
      this.loading = false
    },

    badTypeError() {
      this.loading = false
      this.badFileType = true
    },

    clearForm() {
      this.email = ''
      this.desc = ''
      this.checked = false
      this.$refs.pond.removeFiles()
    },

    async submitForm(e) {
      e.preventDefault()

      // open modal and turn on the loading circle
      this.toggleModal()
      this.startLoading()

      let picArr = []

      this.$refs.pond.getFiles().forEach((file) => {
        let fileEncoded = file.getFileEncodeBase64String()

        if (fileEncoded) {
          picArr.push(fileEncoded)
        } else {
          this.badFileType = true
        }
      })

      if (!this.badFileType) {
        const result = await ApiService.postStory(
          this.email,
          this.desc.trim(),
          picArr,
          this.checked
        )
        if (result.status === 201) {
          this.showSuccess()
          this.clearForm()
        }
      } else {
        this.badTypeError()
      }
    },
  },
}
</script>
