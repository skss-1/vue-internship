<template>
  <div class="home-page py-3">
    <movie-filter
      v-model="selectValue"
      @change="fetchMovies"
    />
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
import MovieFilter from '../components/MovieFilter.vue';
import ItemsList from '../components/ItemsList.vue';
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { ItemsList, MovieFilter },
  data(){
    return{
      selectValue:'popular'
    }
  },
  computed:{
    items(){
      return this.$store.getters['search/getItems']
    }
  },
  mounted() {
    this.fetchMovies()
  },
  methods:{
    fetchMovies(){
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
          console.log('Something broke')
          break;
      }
    }
  }
};
</script>


<style scoped>
.home-page{
  background-color: #020916 ;
}
</style>