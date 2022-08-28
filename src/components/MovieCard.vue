<template>
  <div
    class="movie-card col-lg-2 col-md-2  col-sm-3 col-5 m-3 p-0"
    @click="goToMoviePage"
  >
    <div
      class="card card-hover "
    >
      <img
        class="card-img-top "
        :src="url"
        alt="Card image cap"
      >
      <div class="card-body">
        <div
          class="card-title h5"
        >
          {{ item.title }}
        </div>
        <div class="card-text ">
          <p class="h6 card-rating fw-normal">
            Rate: {{ item.vote_average }}
          </p>
          <p class="h6 card-date fw-normal">
            Year: {{ item.release_date.slice(0,4) }}
          </p>
        </div>
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
  box-shadow:0 4px 16px 0px rgba(0, 0, 0, 0.15) ;
  transform: scale(1.1);
}
.card{
  transition-duration: 0.2s;
}
.card-title{
    overflow:hidden;
    white-space: nowrap;  
}
</style>