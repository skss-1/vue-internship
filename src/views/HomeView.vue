<template>
  <div class="home-page py-3">
    <div
      v-show="!items"
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <movie-filter v-model="selectValue" />
    <movies-list
      v-if="!!items"
      :items="items"
    />
  </div>
</template>

<script>
import MovieFilter from '../components/MovieFilter.vue';
import MoviesList from '../components/MoviesList.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { MoviesList, MovieFilter },
  data(){
    return{
      selectValue:'popular'
    }
  },
  computed:{
    items(){
      return this.$store.getters['search/getItems']
    }
  },watch:{
    selectValue(){
      this.fetchMovies()
    }
  },
  mounted() {
    this.fetchMovies()
  },
  methods:{
    fetchMovies(){
      console.log('fetch')
      switch(this.selectValue){
        case 'top-rated':
          this.$store.dispatch('search/fetchTopRatedMovies');
          break;
        case 'upcoming':
          this.$store.dispatch('search/fetchUpcomingMovies');
          break;
        case 'popular':
          this.$store.dispatch('search/fetchPopularMovies');
          break;
          
        default:
          console.log('((')
          break;
      }
    }
  }
};
</script>
