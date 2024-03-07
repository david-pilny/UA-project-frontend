<script setup>
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

import LoadingIcon from '@core/icons/loading.vue'

import { useModalStore } from '@stores/modal'

import { prepareFiles } from './services'

const db = useFirestore()
const modal = useModalStore()

const pond = ref(null)
const loading = ref(false)

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  // FilePondPluginImagePreview,
  FilePondPluginFileEncode
)
const handleFilePondInit = () => {
  console.log('FilePond has initialized')
}

const formData = ref({
  email: '',
  description: '',
  checked: false,
})

const submitForm = async (e) => {
  loading.value = true
  e.preventDefault()

  const newDoc = await addDoc(collection(db, 'stories'), {
    ...formData.value,
  })

  const storage = getStorage()

  const files = prepareFiles(pond.value.getFiles())
  files.forEach((file, index) => {
    const storageRef = fireRef(storage, `${newDoc.id}/${index}`)
    uploadString(storageRef, file.image, 'base64').then((snapshot) => {
      console.log('Uploaded a base64 string!')
    })
  })

  loading.value = false
  close()
}

const close = () => {
  modal.close()
}
</script>

<template>
  <div
    id="form-container"
    tabindex="-1"
    aria-hidden="true"
    class="form-container"
  >
    <!-- <section> -->
    <form class="form file-form" onkeydown="return event.key != 'Enter';">
      <div class="form-row flex justify-end">
        <h3>Share Your Story</h3>
        <button type="button" class="cross-button" @click="close">
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
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
      <div class="flex justify-between">
        <button type="button" class="button cancel-button mr-8" @click="close">
          Cancel
        </button>
        <button
          type="button"
          class="button submit-button ml-8"
          @click="submitForm"
        >
          <LoadingIcon v-if="loading" />
          Share
        </button>
      </div>
    </form>
    <!-- </section> -->
  </div>
</template>

<style scoped>
.form-container {
  @apply fixed z-[101] flex items-center justify-center w-full inset-0 backdrop-blur overflow-y-auto;
}
.form {
  width: 90%;
  max-width: var(--fixed-width);
  color: var(--white-smoke);
  background: var(--gray);
  border-radius: var(--radius);
  box-shadow: var(--light-shadow);
  padding: 2rem 2.5rem;
  margin: 3rem auto;
}
.form-label {
  display: block;
  font-size: var(--smallText);
  margin-bottom: 0.5rem;
  text-transform: none;
  letter-spacing: var(--letterSpacing);
}
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius);
  background: var(--white-smoke);
  border: 1px solid var(--grey-200);
  color: var(--jet);
}

.form-row {
  margin-bottom: 1rem;
}

.form-textarea {
  height: 7rem;
}
::placeholder {
  font-family: inherit;
  color: var(--grey-400);
}
.form-alert {
  color: var(--red-dark);
  letter-spacing: var(--letterSpacing);
  text-transform: none;
}
.cross-button {
  @apply text-[color:var(--white-smoke)] bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white;
}

.button {
  cursor: pointer;
  border: transparent;
  border-radius: var(--radius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: none;
  display: inline-block;
  width: 100%;
}

.submit-button {
  color: var(--onyx);
  background: var(--white-smoke);
}
.cancel-button {
  color: var(--white-smoke);
  background: var(--onyx);
}
.cancel-button:hover {
  color: var(--clr-white);
  background: var(--davys-gray);
  box-shadow: var(--light-shadow);
}

.submit-button:hover {
  background: var(--silver);
  box-shadow: var(--light-shadow);
}
</style>
