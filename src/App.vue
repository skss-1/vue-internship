<template>
  <div
    id="app"
    class="vh-100"
  >
    <app-header />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
#app {
  font-family: 'Inter', sans-serif;
  background-color: $base-bg-color;
}
</style>