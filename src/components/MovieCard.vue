<template>
  <div
    class="movie-card col-lg-2 col-md-2  col-sm-3 col-5 m-3 p-0"
    @click="goToMoviePage"
  >
    <div
      class="card border-light"
    >
      <div class="card-image">
        <img
          class="card-img-top "
          :src="url"
          alt="Card image cap"
        >
        <p class="h4 card-rating">
          {{ item.vote_average }}
        </p>
      </div>
      <div class="card-body">
        <div
          class="card-title h5 overflow-hidden"
        >
          {{ item.title }}
        </div>
        <div class="card-text d-flex justify-content-start gap-2">
          <p class="h6 card-date fw-lighter">
            {{ item.release_date.slice(0,4) }}  
          </p>
          <p class="card-type h6 fw-normal">
            Film 
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props:{
    item:{
      type:Object,
      required:true,
    }
  },
    computed:{
      url(){
        return `https://image.tmdb.org/t/p/original${this.item.poster_path}`
      }
  },
  methods:{
    goToMoviePage(){
      this.$router.push({ name: 'movie-page', params: { id: this.item.id } })
    }
  }
}
</script>

<style land="sass">
.card:hover{
  box-shadow:0 0px 1.5rem 0px rgba(255, 255, 255, 0.15) ;
  transform: scale(1.1);
}
.card{
  transition-duration: 0.2s;
  color:white;
  background-color: #13152E ;
  overflow: hidden;
}
.card:active .card-body{
  color:black;
  background-color: white;
}
.card-title{
  white-space: nowrap;  
}
.card-image{
  position: relative;
}
.card-rating{
  transition-duration: 0.2s;
  padding: 3px 5px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #13152E ;
  border: 1px solid white;
  border-left:none;
  border-top:none;
  border-bottom-right-radius:5px ;
}
</style>