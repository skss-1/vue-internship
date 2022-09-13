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
      v-if="totalPages > 1"
      :total-pages="totalPages"
      :page="page"
      :route="route"
      :query="query"
      :adult="adultIncluded"
      :year="year"
      :language="language"
      :region="region"
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
      adultIncluded: this.booleanQueryAdultIncluded,
      year: this.$route.query.year,
      language: this.$route.query.language,
      region: this.$route.query.region
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
    },
    queryData() {
      return {
        query:this.$route.query.query? this.$route.query.query: undefined,
        include_adult:this.$route.query.include_adult === 'true'? true: undefined,
        year: this.$route.query.year? this.$route.query.year: undefined,
        language: this.$route.query.language? this.$route.query.language: undefined,
        region: this.$route.query.region? this.$route.query.region: undefined,
        page: this.page,
      }
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.path !== '/' && vm.$route.path !== '/search') {
          vm.fetchMovies(vm.$route.path, vm.page).then(() => {
            vm.$router.push({
              query: {
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
          return this.$store.dispatch('search/search', {
            ...(this.queryData)
          });
        default:
          console.info('Un-handled path: ', path)
          break;
      }
    },
    changePage(newPage) {
      this.page = newPage
      if (this.$route.path === '/search') {
        this.$router.push({
          query: {
            ...(this.queryData)
          }
        })
      } else {
        this.fetchMovies(this.$route.path, this.page).then(() => {
          this.$router.push({
            query: {
              ...(this.queryData)
            }
          })
        })
      }
    },
    changeParams(page, query, route, adultIncluded, year, language, region) {
      this.page = page,
      this.query = query,
      this.route = route,
      this.adultIncluded = adultIncluded
      this.year = year
      this.language = language
      this.region = region
    }
  }
};
</script>

<style scoped lang="scss">
.home-page{
  background-color: #020916;
}
</style>