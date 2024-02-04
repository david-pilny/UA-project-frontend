<template>
  <!-- tours -->
  <section id="form" class="section">
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
            v-model="formData.email"
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
            name="description"
            class="form-input"
            id="description"
            cols="20"
            rows="10"
            v-model="formData.description"
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
          <input
            type="checkbox"
            id="agree"
            name="agree"
            v-model="formData.checked"
          />
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
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import { ref } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import {
  getStorage,
  ref as fireRef,
  uploadBytes,
  uploadString,
} from 'firebase/storage'
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'

import { prepareFiles } from './services'

const db = useFirestore()

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
)

export default {
  components: {
    FilePond,
  },

  data() {
    return {
      formData: {
        email: '',
        description: '',
        checked: false,
      },
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

      const storage = getStorage()
      const storageRef = fireRef(storage, 'baseimg')

      uploadString(
        storageRef,
        prepareFiles(this.$refs.pond.getFiles())[0].image,
        'base64'
      ).then((snapshot) => {
        console.log('Uploaded a base64 string!')
      })

      // // Create file metadata including the content type
      // /** @type {any} */
      // const metadata = {
      //   contentType: 'image/jpeg',
      // }

      // // Upload the file and metadata
      // const uploadTask = uploadString(
      //   storageRef,
      //   this.$refs.pond.getFiles()[0],
      //   metadata
      // )

      // this.$refs.pond.getFiles().forEach((file) => {
      //   uploadBytes(storageRef, file).then((snapshot) => {
      //     console.log('Uploaded a blob or file!')
      //   })
      // })
      // 'file' comes from the Blob or File API

      // const newDoc = await addDoc(collection(db, 'stories'), {
      //   email: this.email,
      //   description: this.desc,
      //   checked: this.checked,
      //   pics: prepareFiles(this.$refs.pond.getFiles()),
      // })

      // console.log(newDoc)

      // let picArr = []

      // this.$refs.pond.getFiles().forEach((file) => {
      //   let fileEncoded = file.getFileEncodeBase64String()

      //   if (fileEncoded) {
      //     picArr.push(fileEncoded)
      //   } else {
      //     this.badFileType = true
      //   }
      // })

      // if (!this.badFileType) {
      //   const result = await ApiService.postStory(
      //     this.email,
      //     this.desc.trim(),
      //     picArr,
      //     this.checked
      //   )
      //   if (result.status === 201) {
      //     this.showSuccess()
      //     this.clearForm()
      //   }
      // } else {
      //   this.badTypeError()
      // }
    },
  },
}
</script>
