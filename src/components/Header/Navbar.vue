<template>
  <!-- navbar -->
  <nav id="nav" ref="nav" :class="fixedNav">
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
            <select
              name="language"
              id="language"
              v-on:change="changeRoute($event)"
            >
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

<script>
export default {
  name: 'Navbar',

  data() {
    return {
      fixedNav: '',
      langPlaceholder: '',
      linksContainerStyle: {
        height: '0',
      },
    }
  },

  computed: {
    navbarLinks() {
      return [
        {
          href: '#home',
          label: this.$t('header.navbar.home'),
        },
        {
          href: '#about',
          label: this.$t('header.navbar.about'),
        },
        {
          href: '#format',
          label: this.$t('header.navbar.format'),
        },
        {
          href: '#tours',
          label: this.$t('header.navbar.form'),
        },
      ]
    },
  },

  created() {
    window.addEventListener('scroll', this.handleScroll)
  },

  methods: {
    containerHeight() {
      return this.$refs.linksContainer.getBoundingClientRect().height
    },

    linksHeight() {
      return this.$refs.links.getBoundingClientRect().height
    },

    navbarHeight() {
      return this.$refs.nav.getBoundingClientRect().height
    },

    changeRoute(event) {
      this.$router.push('/' + event.target.value)
      this.langPlaceholder.selected = true
    },

    handleScroll() {
      const scrollHeight = window.pageYOffset

      if (scrollHeight > this.navbarHeight()) {
        this.fixedNav = 'fixed-nav'
        return
      }
      this.fixedNav = ''
    },

    handleLinkClick(event) {
      // prevent default
      event.preventDefault()

      // navigate to a specific section
      const id = event.currentTarget.getAttribute('href').slice(1)
      const element = document.getElementById(id)
      let position = element.offsetTop - this.navbarHeight()

      if (!this.fixedNav) {
        position -= this.navbarHeight()
      }

      if (this.navbarHeight() > 82) {
        position += this.containerHeight()
      }
      window.scrollTo({
        left: 0,
        top: position,
      })
      this.linksContainerStyle.height = '0'
    },

    navToggle() {
      if (this.containerHeight() === 0) {
        this.linksContainerStyle.height = `${this.linksHeight()}px`
      } else {
        this.linksContainerStyle.height = '0'
      }
    },
  },

  mounted() {
    this.langPlaceholder = this.$refs.langPlaceholder
  },

  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
/* navbar */
nav {
  background: var(--ash-gray);
  padding: 1rem 1.5rem;
}
/* fixed nav */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* background: var(--clr-white); */
  background: var(--ash-gray);
  box-shadow: var(--light-shadow);
  z-index: 1;
}
.fixed-nav .links a {
  color: var(--clr-grey-1);
}
.fixed-nav .links a:hover {
  color: var(--clr-secondary);
}

.fixed-nav .links select {
  color: var(--clr-grey-1);
}
.fixed-nav .links select:hover {
  color: var(--clr-secondary);
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
  color: var(--clr-grey-1);
  background: transparent;
  border-color: transparent;
  transition: var(--transition);
  cursor: pointer;
}
.nav-toggle:hover {
  color: var(--clr-secondary);
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
  background: var(--ash-gray);
  color: var(--clr-jet);
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
  color: var(--clr-grey-5);
  letter-spacing: var(--spacing);
  transition: var(--transition);
}

select:hover {
  cursor: pointer;
  color: var(--clr-grey-1);
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
