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
            v-on:click="displayHistory"
            class="tab-btn active"
            ref="historyBtn"
          >
            {{ $t('body.about.buttons.idea') }}
          </button>
          <button v-on:click="displayVision" class="tab-btn" ref="visionBtn">
            {{ $t('body.about.buttons.inspiration') }}
          </button>
          <button v-on:click="displayGoals" class="tab-btn" ref="goalsBtn">
            {{ $t('body.about.buttons.goals') }}
          </button>
        </div>

        <div class="about-content">
          <!-- single item -->
          <div class="content active" ref="history">
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
          <div class="content" ref="vision">
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
          <div class="content" ref="goals">
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
      bannerImg: require('@/media/about-banner.png'),
    }
  },
  methods: {
    displayHistory() {
      const historyTab = this.$refs.history
      const visionTab = this.$refs.vision
      const goalsTab = this.$refs.goals

      const historyBtn = this.$refs.historyBtn
      const visionBtn = this.$refs.visionBtn
      const goalsBtn = this.$refs.goalsBtn

      if (!historyTab.classList.contains('active')) {
        historyTab.classList.add('active')
      }
      visionTab.classList.remove('active')
      goalsTab.classList.remove('active')

      if (!historyBtn.classList.contains('active')) {
        historyBtn.classList.add('active')
      }
      visionBtn.classList.remove('active')
      goalsBtn.classList.remove('active')
    },
    displayVision() {
      const historyTab = this.$refs.history
      const visionTab = this.$refs.vision
      const goalsTab = this.$refs.goals

      const historyBtn = this.$refs.historyBtn
      const visionBtn = this.$refs.visionBtn
      const goalsBtn = this.$refs.goalsBtn

      if (!visionTab.classList.contains('active')) {
        visionTab.classList.add('active')
      }
      historyTab.classList.remove('active')
      goalsTab.classList.remove('active')

      if (!visionBtn.classList.contains('active')) {
        visionBtn.classList.add('active')
      }
      historyBtn.classList.remove('active')
      goalsBtn.classList.remove('active')
    },
    displayGoals() {
      const historyTab = this.$refs.history
      const visionTab = this.$refs.vision
      const goalsTab = this.$refs.goals

      const historyBtn = this.$refs.historyBtn
      const visionBtn = this.$refs.visionBtn
      const goalsBtn = this.$refs.goalsBtn

      if (!goalsTab.classList.contains('active')) {
        goalsTab.classList.add('active')
      }
      visionTab.classList.remove('active')
      historyTab.classList.remove('active')

      if (!goalsBtn.classList.contains('active')) {
        goalsBtn.classList.add('active')
      }
      historyBtn.classList.remove('active')
      visionBtn.classList.remove('active')
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
  background: var(--clr-grey-9);
  cursor: pointer;
  transition: var(--transition);
  letter-spacing: var(--spacing);
}
.tab-btn:hover:not(.active) {
  background: var(--clr-primary-10);
  color: var(--clr-primary-5);
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
