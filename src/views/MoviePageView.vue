<template>
  <div class="movie-page">
    <div
      class="background-poster"
      :style="backgroundUrl"
    />
    <div class="top-container container d-flex flex-column justify-content-end align-items-center flex-md-row justify-content-md-center align-items-md-end gap-md-5"> 
      <div class="poster"> 
        <img 
          :src="posterUrl" 
          :alt="item.title + ' poster img'" 
          class="poster-img"
        >
      </div> 
      <div class="item-title h1 m-0 w-50 py-4"> 
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
  name: 'MoviePageView',
  computed: {
    item() {
      return this.$store.getters['movie/getItem']
    },
    credits() {
      return this.$store.getters['movie/getActors']
    },
    posterUrl() {
      return `https://image.tmdb.org/t/p/original${this.item.poster_path}`
    },
    backgroundUrl() {
      return `backgroundImage: linear-gradient(0deg, rgba(19, 21, 46, 0.7), rgba(19, 21, 46, 0.7)), url(https://image.tmdb.org/t/p/original${this.item.backdrop_path})`
    },
    releaseDate() {
        const month= ['January','February','March','April','May','June','July','August','September','October','November','December']
        let date=`${month[+this.item.release_date.slice(5,7) -1]} ${+this.item.release_date.slice(8,10)} ${this.item.release_date.slice(0,4)}`
        return date
    }
  },
   mounted() {
    this.$store.dispatch('movie/fetchMovieDetails',{ id:this.$route.params.id });
  }
}
</script>

<style scoped lang="scss">
.movie-page{
  --image-height-for-movie-page:500px;
  --title-height-for-movie-page:150px;

  padding-top: var(--title-height-for-movie-page);
  position: relative;
  background-color: #13152E;
  color: #fff;

  .background-poster{ 
  position: absolute;
  top: 0;
  left: 0;
  height: var(--image-height-for-movie-page);
  width: 100%;
  background-size: cover;
  background-position: center;
  }
}
.top-container{
  position: relative;
  height: var(--image-height-for-movie-page);

  .item-title{
    color: #fff;
    height: var(--title-height-for-movie-page);
  }
  .poster{
    img{
      border:30px solid #13152E;
      height: var(--image-height-for-movie-page);
    }
  }
}

</style>