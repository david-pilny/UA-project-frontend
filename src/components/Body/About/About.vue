<template>
  <!-- about -->
  <section id="about" class="section">
    <div class="title">
      <h2 class="">{{ $t('body.about.title') }}</h2>
    </div>

    <div class="about-center section-center">
      <img :src="bannerImg" alt="" />

      <article class="about">
        <!-- btn container -->
        <div class="btn-container">
          <button
            v-for="category in categories"
            v-on:click="displayCategory(category)"
            :class="`tab-btn ${activeClasses[category]}`"
            :key="category"
          >
            {{ $t(translations[category]) }}
          </button>
        </div>

        <div class="about-content">
          <!-- single item -->
          <div :class="`content ${activeClasses.history}`">
            <h4>{{ $t('body.about.idea.title') }}</h4>
            <p>
              {{ $t('body.about.idea.firstParagraph') }}
            </p>
            <p>
              {{ $t('body.about.idea.secondParagraph') }}
            </p>
          </div>
          <!-- end of single item -->

          <!-- single item -->
          <div :class="`content ${activeClasses.vision}`">
            <h4>{{ $t('body.about.inspiration.title') }}</h4>
            <p v-html="$t('body.about.inspiration.firstParagraph')"></p>
            <p>
              {{ $t('body.about.inspiration.secondParagraph') }}
            </p>
            <p>
              {{ $t('body.about.inspiration.thirdParagraph') }}
            </p>
          </div>
          <!-- end of single item -->

          <!-- single item -->
          <div :class="`content ${activeClasses.goals}`">
            <h4>{{ $t('body.about.goals.title') }}</h4>
            <p>
              {{ $t('body.about.goals.firstParagraph') }}
            </p>
          </div>
          <!-- end of single item -->
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',

  data() {
    return {
      categories: ['history', 'vision', 'goals'],
      activeClasses: {
        history: '',
        vision: '',
        goals: '',
      },
      translations: {
        history: 'body.about.buttons.idea',
        vision: 'body.about.buttons.inspiration',
        goals: 'body.about.buttons.goals',
      },
      bannerImg: require('@/media/about-banner.png'),
    }
  },

  created() {
    this.displayCategory('history')
  },

  methods: {
    displayCategory(category) {
      this.categories.forEach((classKey) => {
        this.activeClasses[classKey] = ''
        if (classKey === category) this.activeClasses[classKey] += 'active'
      })
    },
  },
}
</script>

<style scoped>
.about-content {
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  padding: 2rem 1.5rem;
}
.about-img {
  margin-bottom: 2rem;
}
.about-img img {
  border-radius: var(--radius);
  object-fit: cover;
  height: 20rem;
}
@media screen and (min-width: 992px) {
  .about-img {
    margin-bottom: 0;
  }

  .about-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
}
.about {
  background: var(--clr-white);
  border-radius: var(--radius);
  display: grid;
  grid-template-rows: auto 1fr;
}
.btn-container {
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.tab-btn:nth-child(1) {
  border-top-left-radius: var(--radius);
}
.tab-btn:nth-child(3) {
  border-top-right-radius: var(--radius);
}
.tab-btn {
  padding: 1rem 0;
  border: none;
  text-transform: none;
  font-size: 1rem;
  display: block;
  background: var(--silver);
  color: var(--clr-black);
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: var(--spacing);
}
.tab-btn:hover:not(.active) {
  background: var(--silver-2);
}

.tab-btn.active {
  background: var(--clr-white);
}

/* hide content */
.content {
  display: none;
}

.content.active {
  display: block;
}
</style>
