<template>
  <div id="app">
    <app-header />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
  computed: {
    env() {
      return process.env
    }
  }
};
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
</style>