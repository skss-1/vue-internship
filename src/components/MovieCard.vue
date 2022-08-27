<template>
  <div class="movie-card col-md-2 col-lg-2 col-sm-3 col-5 m-3 p-0">
    <div
      class="card-hover card"
    >
      <img
        class="card-img-top"
        :src="url"
        alt="Card image cap"
      >
      <div class="card-body">
        <div
          class="card-title fw-normal"
        >
          {{ item.title }}
        </div>
        <div class="card-text fs-6 fw-lighter">
          <p class="card-rating">
            Rate: {{ item.vote_average }}
          </p>
          <p class="card-date">
            Date: {{ item.release_date }}
          </p>
        </div>
        <a
          href="#"
          class="btn btn-xs btn-primary"
        >Details</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    }

}
</script>

<style>
.card:hover  {
    box-shadow:0 4px 16px 0px rgba(0, 0, 0, 0.15) ;
}
.card-title{
    overflow:hidden;
    height: 4rem;
    
}
.card-img-top{
object-fit: cover;  
}
</style>