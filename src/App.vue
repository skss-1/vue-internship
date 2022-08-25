<template>
  <div id="app">
    <AppHeader>
      <SearchForm />
    </AppHeader>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import SearchForm from './components/SearchForm.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    SearchForm,
  },
};
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
</style>