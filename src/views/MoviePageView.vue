<template>
  <div class="movie-page">
    <div
      class="background-poster"
      :style="backgroundUrl"
    />
    <div class="top-container container d-flex flex-column justify-content-end align-items-center flex-md-row justify-content-md-center align-items-md-end gap-md-5 my-3"> 
      <div class="poster"> 
        <img 
          :src="posterUrl" 
          :alt="item.title + ' poster img'" 
          class="poster-img"
        >
      </div> 
      <div class="item-title h1 m-0 w-50 "> 
        {{ item.title }} 
      </div> 
    </div> 
    <div class="qqq">
      asd
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoviePageView',
  data() {
    return {
      titleHeight:'150px',
      imageHeight:'500px',
    }
  },
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
:root{
  --test-var: white;
}
.movie-page{
  padding-top: v-bind(titleHeight);
  position: relative;
  background-color: #13152E;
  color: #fff;

  .background-poster{ 
  position: absolute;
  top: 0;
  left: 0;
  height: v-bind(imageHeight);
  width: 100%;
  background-size: cover;
  background-position: center;
  }
  *{
    border:2px solid tomato;
  }
}
.top-container{
  position: relative;
  color: black;
  height: v-bind(imageHeight);

  .item-title{
    color: white;
    height: v-bind(titleHeight);
  }
  .poster{
    img{
      height: v-bind(imageHeight);
    }
  }
}

</style>