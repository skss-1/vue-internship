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
      v-if="items.length"
      :total-pages="totalPages"
      :page="page"
      :route="route"
      :query="query"
      :adult="adultIncluded"
      @onChange="changePage"
      @change-params="changeParams"
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
      page: +this.$route.query.page || 1,
      route: this.$route.path,
      query: this.$route.query.query,
      adultIncluded: this.booleanQueryAdultIncluded
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
    },
    booleanQueryAdultIncluded() {
      return this.$route.query.include_adult === 'true'? true : false
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.path !== '/' && vm.$route.path !== '/search') {
          console.log('BeforeRouteEnter')
          vm.fetchMovies(vm.$route.path, vm.page).then(() => {
            vm.route = vm.$route.path
            vm.query = vm.$route.query.query
            vm.adultIncluded = vm.booleanQueryAdultIncluded
            vm.$router.push({
              query: {
                // query:vm.$route.query.query,
                // include_adult:vm.$route.query.include_adult,
                page: vm.page
              }
            })
          })
        }
    })
  },
  methods: {
    fetchMovies(path, page) {
      if(path !== this.currentRoute) {
        page = this.$route.query.page
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
    changeParams(page, query, route, adultIncluded) {
      this.page = page,
      this.query = query,
      this.route = route,
      this.adultIncluded = adultIncluded
    }
  }
};
</script>

<style scoped lang="scss">
.home-page{
  background-color: #020916;
}
</style>