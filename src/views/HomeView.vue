<template>
  <div class="home-page">
    <div
      v-show="!items"
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>

    <movies-list
      v-if="!!items"
      :items="items"
    />
  </div>
</template>

<script>
import MoviesList from '../components/MoviesList.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { MoviesList },
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
