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
    <pagination 
      :total-pages="totalPages"
      :page="page"
      @onChange="changePage"
    />
  </div>
</template>

<script>
import ItemsList from '@/components/ItemsList.vue';
import Pagination from '@/components/Pagination.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { 
    ItemsList,
    Pagination
  },
  data() {
    return {
      page: this.$store.getters['search/getCurrentPage'],
      currentRoute: this.$route.path
    }
  },
  computed: {
    items() {
      return this.$store.getters['search/getItems'];
    },
    totalPages() {
      return this.$store.getters['search/getTotalPages'];
    },
    currentPage() {
      return this.$store.getters['search/getCurrentPage'];
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.path !== '/' && vm.$route.path !== '/search') {
          vm.fetchMovies(vm.$route.path, vm.currentPage).then(() => {
            vm.$router.push({
              query: {
                query:vm.$route.query.query,
                include_adult:vm.$route.query.include_adult,
                page: vm.currentPage
              }
            })
          })
        }
    })
  },
  methods: {
    fetchMovies(path, page) {
      if(path !== this.currentRoute) {
        page = 1
        this.currentRoute = path
      }
      switch(path) {
        case '/top-rated':
          return this.$store.dispatch('search/fetchTopRatedMovies', { page });
        case '/upcoming':
          return this.$store.dispatch('search/fetchUpcomingMovies', { page });
        case '/popular':
          return this.$store.dispatch('search/fetchPopularMovies', { page });
        case '/search':
          return this.$store.dispatch('search/searchMovie', {
            searchValue:this.$route.query.query,
            adultIncluded:this.$route.query.include_adult,
            page: this.page,
          });
        default:
          console.info('Un-handled path: ', path)
          break;
      }
    },
    changePage(newPage) {
      this.page = newPage
      this.fetchMovies(this.$route.path, this.page).then(() => {
        this.$router.push({
          query: {
            include_adult:this.$route.query.include_adult,
            query:this.$route.query.query,
            page: this.page
          }
        })
      })
    },
  }
};
</script>

<style scoped lang="scss">
.home-page{
  background-color: #020916;
}
</style>