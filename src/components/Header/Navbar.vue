<template>
  <!-- navbar -->
  <nav id="nav" ref="nav">
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
      <div class="links-container" ref="linksContainer">
        <ul class="links" ref="links">
          <li>
            <a href="#home" class="scroll-link">{{
              $t('header.navbar.home')
            }}</a>
          </li>
          <li>
            <a href="#about" class="scroll-link">{{
              $t('header.navbar.about')
            }}</a>
          </li>
          <li>
            <a href="#services" class="scroll-link">{{
              $t('header.navbar.format')
            }}</a>
          </li>
          <li>
            <a href="#tours" class="scroll-link">{{
              $t('header.navbar.form')
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
      nav: '',
      linksContainer: '',
      links: '',
      langPlaceholder: '',
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      const scrollHeight = window.pageYOffset
      const navHeight = this.nav.getBoundingClientRect().height

      if (scrollHeight > navHeight) {
        this.nav.classList.add('fixed-nav')
      } else {
        this.nav.classList.remove('fixed-nav')
      }
    },
    navToggle() {
      const containerHeight = this.linksContainer.getBoundingClientRect().height
      const linksHeight = this.links.getBoundingClientRect().height
      if (containerHeight === 0) {
        this.linksContainer.style.height = `${linksHeight}px`
      } else {
        this.linksContainer.style.height = 0
      }
    },
    changeRoute(e) {
      this.$router.push('/' + e.target.value)
      this.langPlaceholder.selected = true
    },
  },
  mounted() {
    this.nav = this.$refs.nav
    this.linksContainer = this.$refs.linksContainer
    this.links = this.$refs.links
    this.langPlaceholder = this.$refs.langPlaceholder

    const scrollLinks = document.querySelectorAll('.scroll-link')

    scrollLinks.forEach((scrollLink) => {
      scrollLink.addEventListener('click', (e) => {
        // prevent default
        e.preventDefault()
        // navigate to a specific section
        const id = e.currentTarget.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        const navHeight = this.nav.getBoundingClientRect().height
        const containerHeight =
          this.linksContainer.getBoundingClientRect().height
        const fixedNav = this.nav.classList.contains('fixed-nav')
        let position = element.offsetTop - navHeight

        if (!fixedNav) {
          position -= navHeight
        }

        if (navHeight > 82) {
          position += containerHeight
        }
        window.scrollTo({
          left: 0,
          top: position,
        })
        this.linksContainer.style.height = 0
      })
    })
  },
}
</script>

<style scoped>
/* navbar */
nav {
  background: var(--clr-white);
  padding: 1rem 1.5rem;
}
/* fixed nav */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--clr-white);
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
  background: var(--clr-white);
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
