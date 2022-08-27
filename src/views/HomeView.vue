<template>
  <div class="home-page">
    <div
      v-if="!items"
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <p
      v-for="item in items"
      :key="item.id"
      class="bg-primary container-sm"
    >
      {{ item.title }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  computed:{
    items(){
      return this.$store.getters['search/getItems']
    }
  },
  mounted() {
    console.log(this.$store.getters['search/getItems'])
    this.$store.dispatch('search/fetchPopularMovies');
  }
};
</script>
