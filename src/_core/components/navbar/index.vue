<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()

const props = withDefaults(defineProps<{ home?: boolean }>(), { home: false })

const langPlaceholder = ref<HTMLOptionElement | null>(null)
const links = ref<HTMLElement | null>(null)
const linksContainer = ref<HTMLElement | null>(null)
const navbar = ref<HTMLElement | null>(null)

const fixedNav = ref<'fixed-nav' | ''>('')
const linksContainerStyle = ref({ height: '0' })

const navbarLinks = computed(() => {
  return [
    {
      href: '#home',
      label: t('header.navbar.home'),
    },
    {
      href: '#about',
      label: t('header.navbar.about'),
    },
    {
      href: '#format',
      label: t('header.navbar.format'),
    },
  ]
})

const containerHeight = () => {
  return linksContainer.value?.getBoundingClientRect().height || 0
}

const linksHeight = () => {
  return links.value?.getBoundingClientRect().height || 0
}

const navbarHeight = () => {
  return navbar.value?.getBoundingClientRect().height || 0
}

const changeLang = (event: Event) => {
  locale.value = (event.target as HTMLSelectElement).value
  if (langPlaceholder.value) langPlaceholder.value.selected = true
}

const handleScroll = () => {
  const scrollHeight = window.pageYOffset

  if (scrollHeight > navbarHeight()) {
    fixedNav.value = 'fixed-nav'
    return
  }
  fixedNav.value = ''
}

const handleLinkClick = (event: MouseEvent) => {
  event.preventDefault()

  const hrefAttribute = (event.currentTarget as HTMLAnchorElement).getAttribute(
    'href'
  )

  if (hrefAttribute === null || hrefAttribute === undefined) {
    return
  }

  const id = hrefAttribute.slice(1)

  if (id === 'form') {
    router.push({ path: '/form' })
    return
  }

  if (props.home) {
    scrollToSection(id)
  } else {
    router.push({ path: `/${id}` })
  }
}

const navToggle = () => {
  if (containerHeight() === 0) {
    linksContainerStyle.value.height = `${linksHeight()}px`
  } else {
    linksContainerStyle.value.height = '0'
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  const offset = element?.offsetTop || 0
  let position = offset - navbarHeight()

  if (!fixedNav.value) {
    position -= navbarHeight()
  }

  if (navbarHeight() > 82) {
    position += containerHeight()
  }
  window.scrollTo({
    left: 0,
    top: position,
  })
  linksContainerStyle.value.height = '0'
}

onMounted(() => {
  if (props.home) {
    window.addEventListener('scroll', handleScroll)
  } else {
    fixedNav.value = 'fixed-nav'
  }
  const section = route.params.section

  // Check if section is an array and use the first element
  const id = Array.isArray(section) ? section[0] : section
  scrollToSection(id)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- navbar -->
  <nav id="nav" ref="navbar" :class="fixedNav">
    <div class="nav-center">
      <!-- nav header -->
      <div class="nav-header">
        <a href="">
          <button type="button" class="btn-2 btn-dark">Donate</button>
        </a>

        <button @click="navToggle" class="nav-toggle">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- links -->
      <div
        class="links-container"
        :style="linksContainerStyle"
        ref="linksContainer"
      >
        <ul class="links" ref="links">
          <li v-for="link in navbarLinks" :key="link.href">
            <a :href="link.href" class="scroll-link" @click="handleLinkClick">{{
              link.label
            }}</a>
          </li>

          <li>
            <a href="#form" class="scroll-link" @click="handleLinkClick">{{
              $t('header.navbar.form')
            }}</a>
          </li>

          <li>
            <select name="language" id="language" v-on:change="changeLang">
              <option ref="langPlaceholder" selected disabled hidden>
                {{ $t('langSwitcher') }}
              </option>
              <option value="cs">čeština</option>
              <option value="en">English</option>
              <!-- <option>українська</option> -->
            </select>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* navbar */
nav {
  background: var(--white-smoke);
  padding: 1rem 1.5rem;
}
/* fixed nav */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--white-smoke);
  box-shadow: var(--light-shadow);
  z-index: 1;
}
.fixed-nav .links a {
  color: var(--jet);
}
.fixed-nav .links a:hover {
  color: var(--gray);
}

.fixed-nav .links select {
  color: var(--gray);
}
.fixed-nav .links select:hover {
  color: var(--gray);
}
/* .fixed-nav .links-container {
  height: auto !important;
} */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-toggle {
  font-size: 1.5rem;
  color: var(--jet);
  background: transparent;
  border-color: transparent;
  transition: var(--transition);
  cursor: pointer;
}
.nav-toggle:hover {
  color: var(--gray);
}
.logo {
  height: 50px;
}
.links-container {
  height: 0;
  overflow: hidden;
  transition: var(--transition);
}
.show-links {
  height: 200px;
}
.links a {
  background: var(--white-smoke);
  color: var(--clr-grey-5);
  font-size: 1.1rem;
  text-transform: none;
  letter-spacing: var(--spacing);
  display: block;
  transition: var(--transition);
  font-weight: bold;
  padding: 0.75rem 0;
}
.links a:hover {
  color: var(--clr-grey-1);
}

select {
  appearance: none;
  outline: none;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0.75rem 0 0 0;
  width: 100%;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: inherit;
  line-height: inherit;
  color: var(--gray);
  letter-spacing: var(--spacing);
  transition: var(--transition);
}

select:hover {
  cursor: pointer;
  color: var(--gray);
}

@media screen and (min-width: 800px) {
  nav {
    background: transparent;
  }
  .nav-center {
    width: 90vw;
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-header {
    padding: 0;
  }
  .nav-toggle {
    display: none;
  }
  .links-container {
    height: auto !important;
  }
  .links {
    display: flex;
  }
  .links a {
    background: transparent;
    color: var(--clr-white);
    font-size: 1.1rem;
    text-transform: none;
    letter-spacing: var(--spacing);
    display: block;
    transition: var(--transition);
    margin: 0 1rem;
    font-weight: bold;
    padding: 0;
  }
  .links a:hover {
    cursor: pointer;
  }

  select {
    appearance: none;
    outline: none;
    background-color: transparent;
    border: none;
    padding: 0 0 0 0.75rem;
    margin: 0 1rem;
    width: 100%;
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: inherit;
    line-height: inherit;
    color: var(--clr-white);
    letter-spacing: var(--spacing);
    transition: var(--transition);
  }

  select:hover {
    cursor: pointer;
  }
}
</style>
