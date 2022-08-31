<template>
  <div class="movie-page">
    <div class="background-image" :style="backgroundUrl"></div>
    <div 
      class="top-container d-flex flex-row justify-content-center align-items-end w-100 gap-5"
    >
      <div class="poster">
        <img
          :src="posterUrl"
          alt="Image cap"
          class="poster-img"
          width="100%"
        >
        <p class="item-status h5 p-1 fw-light text-center">
          Status: {{ item.status }}
        </p>
      </div>
      <div class="item-title h1">
          {{ item.title }}
      </div>
    </div>
    <div class="bottom-container">
      <div class="container py-5">
        
        <p class="h5 px-3">
          Avarage score: {{ item.vote_average }}
        </p>
        <p class="h3 px-2">
          Release Date: {{ releaseDate }}
        </p>
        <p class="fs-4">
          Overview
        </p>
        <p class="fs-5 fw-lighter">
          {{ item.overview }}
        </p>
        <p class="fs-4">
          Genres 
          <span
            v-for="genre in item.genres"
            :key="genre.id"
            class="fs-6 fw-lighter"
          > {{ genre.name }} </span>
        </p>
        <p class="fs-4">
          Actors 
          <span
            v-for="actor in credits"
            :key="actor.id"
            class="fs-6 fw-lighter"
          > {{ actor.name }}, </span>
        </p>
        <p class="fs-4">
          Companies 
          <span
            v-for="company in item.production_companies"
            :key="company.id"
            class="fs-6 fw-lighter"
          > {{ company.name }}, </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoviePage',
  computed:{
    item(){
      return this.$store.getters['movie/getItem']
    },credits(){
      return this.$store.getters['movie/getActors']
    },
    posterUrl(){
      return `https://image.tmdb.org/t/p/original${this.item.poster_path}`
    },
    backgroundUrl(){
      return `backgroundImage:linear-gradient(0deg, rgba(19, 21, 46, 0.7), rgba(19, 21, 46, 0.7)) ,url(https://image.tmdb.org/t/p/original${this.item.backdrop_path})`
    },
    releaseDate(){
        const month= ['January','February','March','April','May','June','July','August','September','October','November','December']
        let date=`${month[+this.item.release_date.slice(5,7) -1]} ${+this.item.release_date.slice(8,10)} ${this.item.release_date.slice(0,4)}`
        return date
    }
  },
   mounted() {
    this.$store.dispatch('movie/fetchMovieDetails',{ id:this.$route.params.id } );
  }
}
</script>

<style scoped>
.movie-page{
  position: relative;
  background-color: #13152E;
}
.background-image{
  width: 100%;
    height: 50vh;
    background-size: cover;
    background-position: center;
}
.top-container{
  height: 20vh;
  border:3px solid white;
}
.poster{
  border:3px solid white;
    color: white;
    width:20vw;
}
.item-title{
  border:3px solid white;
    color: white;
    width:40vw;
}

.bottom-container{
    color: white;
    background-color: #13152E;
}
.item-status{
  margin: 0;
  position:absolute;
  bottom: 0;
  background-color: #13152E;
}

</style>