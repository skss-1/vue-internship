<template>
  <div class="home-page py-3">
    <div
      v-show="!items.length"
      class="container p-5 h3"
    >
      No movies found 
    </div>
    <items-list
      v-if="!!items"
      :items="items"
    />
  </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { 
    ItemsList
  },
  data() {
    return {
      selectValue: 'popular'
    }
  },
  computed: {
    items() {
      return this.$store.getters['search/getItems'];
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.path !== '/') {
          vm.fetchMovies(vm.$route.path)
        }
    })
  },
  methods: {
    fetchMovies(path) {
      switch(path) {
        case '/top-rated':
          this.$store.dispatch('search/fetchTopRatedMovies');
          break;
        case '/upcoming':
          this.$store.dispatch('search/fetchUpcomingMovies');
          break;
        case '/popular':
          this.$store.dispatch('search/fetchPopularMovies');
          break;
        case '/search':
          break;
        case '/':
          this.$store.dispatch('search/fetchPopularMovies');
          break;
        default:
          console.log('Something broke');
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.home-page{
  background-color: #020916;
}
</style>