<template>
  <div class="home-page py-3">
    <div
      v-if="isLoading"
      class="loader text-center p-5"
    >
      <div
        class="spinner-border text-light"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="!isLoading && !items.length"
      class="container p-5 h3 text-light"
    >
      No movies found 
    </div>
    <items-list
      v-else
      :items="items"
    />
    <pagination 
      v-if="totalPages > 1"
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
      page: Number(this.$route.query.page) || 1,
      currentPath: this.$route.path
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['search/getIsLoading'];
    },
    items() {
      return this.$store.getters['search/getItems'];
    },
    totalPages() {
      return this.$store.getters['search/getTotalPages'];
    },
    queryData() {
      return {
        query: this.$route.query.query ? this.$route.query.query : undefined,
        include_adult: this.$route.query.include_adult === 'true'? true : undefined,
        year: this.$route.query.year ? this.$route.query.year : undefined,
        language: this.$route.query.language ? this.$route.query.language : undefined,
        region: this.$route.query.region ? this.$route.query.region : undefined,
        page: this.page,
      }
    }
  },
  beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.$route.path !== '/' && vm.$route.path !== '/search') {
          vm.fetchMovies(vm.$route.path, 1).then(() => {
            vm.$router.push({
              query: {
                page: 1
              }
            })
          })
        }
    })
  },
  methods: {
    fetchMovies(path, page) {
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
  }
};
</script>

<style scoped lang="scss">
.home-page{
  background-color: #020916;
}
</style>