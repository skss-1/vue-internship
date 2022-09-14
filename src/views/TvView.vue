<template>
  <div class="tv-view">
    <div
      class="background-poster"
      :style="backgroundUrl"
    />
    <div class="top-container container d-flex flex-column justify-content-end align-items-center flex-md-row justify-content-md-center align-items-md-end gap-md-5"> 
      <div class="poster"> 
        <img 
          :src="posterUrl" 
          :alt="item.name + ' poster img'" 
          class="poster-img"
        >
      </div> 
      <div class="item-title h1 m-0 w-50 py-4 w-100 text-center"> 
        {{ item.name }} 
      </div> 
    </div> 
    <div class="bottom-container"> 
      <div class="container"> 
        <div class="top-row d-flex justify-content-evenly flex-wrap flex-md-nowrap mb-5">
          <p class="fs-5 px-3 fw-light d-flex flex-column align-items-center">
            Avarage score: <span class="fs-6 fw-normal">{{ item.vote_average }}</span>
          </p> 
          <p class="fs-5 px-2 fw-light d-flex flex-column align-items-center"> 
            Release Date: <span class="fs-6 fw-normal">{{ releaseDate }} </span>
          </p>
          <p class="fs-5 px-2 fw-light d-flex flex-column align-items-center"> 
            Status: <span class="fs-6 fw-normal">{{ item.status }} </span>
          </p>
          <p class="fs-5 px-2 fw-light d-flex flex-column align-items-center"> 
            Seasons: <span class="fs-6 fw-normal">{{ item.number_of_seasons }} </span>
          </p>
          <p class="fs-5 px-2 fw-light d-flex flex-column align-items-center"> 
            Episodes: <span class="fs-6 fw-normal">{{ item.number_of_episodes }} </span>
          </p>
        </div>
        <div class="fs-4 genres-heading d-flex gap-3 mx-3 mb-5"> 
          <p class="m-0">
            Genres
          </p>
          <div class="genres d-flex gap-3 flex-wrap">
            <div 
              v-for="genre in item.genres" 
              :key="genre.id" 
              class="fs-6 fw-lighter border border-light rounded-pill py-1 px-4" 
            >
              {{ genre.name }}
            </div> 
          </div>
        </div> 
        <div class="fs-2 overview-heading mb-2"> 
          Overview 
        </div> 
        <p class="fs-5 fw-lighter overview m-0 mb-5"> 
          {{ item.overview }} 
        </p> 
        <div class="fs-4 credits-heading mx-3"> 
          Credits 
        </div>
        <credits-scroll
          :credits="credits"
          class="mb-5"
        />
        <p class="fs-4 companies-heading d-flex gap-3 m-0 px-2">
          Companies
        </p>
        <div class="companies d-flex flex-wrap gap-3 p-4">
          <div 
            v-for="company in item.production_companies" 
            :key="company.id"  
            class="fs-6 fw-lighter border border-light rounded-pill py-1 px-4 py-2 px-3" 
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
  name: 'MoviePageView',
  components: {
    CreditsScroll,
  },
  computed: {
    item() {
      return this.$store.getters['tv/getItem'];
    },
    credits() {
      return this.$store.getters['tv/getActors'];
    },
    posterUrl() {
      return `${posterPath}${this.item.poster_path}`;
    },
    backgroundUrl() {
      return `backgroundImage: linear-gradient(0deg, rgba(19, 21, 46, 0.7), rgba(19, 21, 46, 0.7)), url(${posterPath}${this.item.backdrop_path})`;
    },
    releaseDate() {
      const releaseDate = new Date(Date.parse(this.item.first_air_date));
      return releaseDate.toLocaleString('en', { dateStyle: 'long' });
    },
  },
  mounted() {
    this.$store.dispatch('tv/fetchTvDetails',{ id:this.$route.params.id });
  }
}
</script>

<style scoped lang="scss">
.tv-view{
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