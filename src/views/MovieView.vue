<template>
  <div
    v-if="loading"
    class="loader text-center p-5"
  >
    <div
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div
    v-else
    class="movie-view"
  >
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
      <div class="container"> 
        <div class="top-row d-flex justify-content-center">
          <p class="fs-5 px-3 fw-light">
            Avarage score: <span class="fs-6 fw-normal">{{ item.vote_average }}</span>
          </p> 
          <p class="fs-5 px-2 fw-light"> 
            Release Date: <span class="fs-6 fw-normal">{{ releaseDate }} </span>
          </p>
        </div>
        <div class="fs-4 genres-heading d-flex gap-3 m-3 py-4"> 
          <p class="m-0">
            Genres
          </p>
          <div class="genres d-flex gap-3">
            <div 
              v-for="genre in item.genres" 
              :key="genre.id" 
              class="fs-6 fw-lighter rounded-pill border border-light rounded py-2 px-3" 
            >
              {{ genre.name }}
            </div> 
          </div>
        </div> 
        <div class="fs-2 overview-heading"> 
          Overview 
        </div> 
        <p class="fs-5 fw-lighter overview m-0"> 
          {{ item.overview }} 
        </p> 
        <div class="fs-4 credits-heading m-3 "> 
          Credits 
        </div>
        <credits-scroll :credits="credits" />
        <p class="fs-4 companies-heading d-flex gap-3 m-0 px-2">
          Companies
        </p>
        <div class="companies d-flex flex-wrap gap-3 p-4">
          <div 
            v-for="company in item.production_companies" 
            :key="company.id"  
            class="fs-6 fw-lighter rounded-pill border border-light rounded py-2 px-3" 
          >
            {{ company.name }}
          </div> 
        </div>
      </div> 
    </div> 
  </div>
</template>
<script>
import CreditsScroll from '@/components/CreditsScroll.vue';
import { posterPath } from '@/api/tmdb-api';

export default {
  name: 'MovieView',
  components: {
    CreditsScroll,
  },
  computed: {
    loading() {
      console.log(this.$store.getters['movie/getLoading'])
      return this.$store.getters['movie/getLoading'];
    },
    item() {
      return this.$store.getters['movie/getItem'];
    },
    credits() {
      return this.$store.getters['movie/getActors'];
    },
    posterUrl() {
      return this.item.poster_path? `${posterPath}${this.item.poster_path}`: require('../assets/no-image.png');
    },
    backgroundUrl() {
      return `backgroundImage: linear-gradient(0deg, rgba(19, 21, 46, 0.7), rgba(19, 21, 46, 0.7)), url(${posterPath}${this.item.backdrop_path})`;
    },
    releaseDate() {
      const releaseDate = new Date(Date.parse(this.item.release_date));
      return releaseDate.toLocaleString('en', { dateStyle: 'long' });
    }
  },
   mounted() {
    this.$store.dispatch('movie/fetchMovieDetails',{ id:this.$route.params.id });
  }
}
</script>

<style scoped lang="scss">
.loader{
  background-color: #13152E;
  color: #fff;
  height: 30vh;
}

.movie-view{
  --image-height-for-movie-page: 500px;
  --title-height-for-movie-page: 150px;
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
      border: 30px solid #13152E;
      height: var(--image-height-for-movie-page);
    }
  }
}
.overview-heading{
  padding: 5px 10px;
  border-left: 10px double #fff;
}
.overview{
  padding: 15px 5px;
}
.credits-heading{
  border-bottom: 2px solid #fff;
}
.companies-heading{
  border-left: 5px solid #fff;
}
</style>