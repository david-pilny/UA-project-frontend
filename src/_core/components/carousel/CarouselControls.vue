<script setup>
const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <!-- in vue 2.x you need wrap these buttons in a div -->
  <div class="control-div">
    <button class="carousel-control left" @click="emit('prev')">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button class="carousel-control right" @click="emit('next')">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </button>
  </div>
</template>

<style scoped>
.control-div {
  display: flex;
  justify-content: center;
  margin-top: 0.75rem;
}
.carousel-control {
  /* background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: inline-block;
  position: absolute;
  height: 30px;
  width: 40px;
  top: calc(50% - 25px);
  color: #f3f3f3;
  cursor: pointer; */

  height: 30px;
  width: 40px;
  display: inline-block;
  position: absolute;
  background: transparent;
  border-color: transparent;
  font-size: 1.75rem;
  cursor: pointer;
  margin: 0 0.25rem;
  text-transform: capitalize;
  letter-spacing: 2px;
  color: var(--clr-grey-5);
  transition: var(--transition);
}

@media screen and (min-width: 768px) {
  .carousel-control {
    height: 50px;
    width: 70px;
  }
}
.left {
  left: 0;
}
.right {
  right: 0;
}
</style>
