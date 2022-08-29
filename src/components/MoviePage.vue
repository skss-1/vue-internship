<template>
  <div class="movie-page">
    <div 
      class="top-container d-flex flex-row justify-content-center w-100 p-5 gap-5"
      :style="backgroundUrl"
    >
      <div class="poster">
        <img
          :src="posterUrl"
          alt="Image cap"
          class="poster-img"
          width="100%"
        >
        <p class="h5 p-1 fw-light text-center">
          Status: {{ item.status }}
        </p>
      </div>
      <div class="item-info">
        <p class="h1">
          {{ item.title }}
        </p>
        <p class="h5 px-3">
          Avarage score: {{ item.vote_average }}
        </p>
        <p class="h3 px-2">
          Release Date: {{ releaseDate }}
        </p>
      </div>
    </div>
    <div class="bottom-container">
      <div class="container py-5">
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
      return `backgroundImage:linear-gradient(0deg, rgba(19, 21, 46, 0.95), rgba(19, 21, 46, 0.50)) ,url(https://image.tmdb.org/t/p/original${this.item.backdrop_path})`
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
.top-container{
    background-size: cover;
    background-position: center;
    box-shadow: inset 0px -66px 66px #13152E;
}
.bottom-container{
    color: white;
    background-color: #13152E;
}
.poster{
    color: white;
    width:20vw;
}
.item-info{
    color: white;
    width:50vw;
}
</style>