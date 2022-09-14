<template>
  <div id="app">
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
  min-height: 100vh;
  background-color: #020916;
}
</style>