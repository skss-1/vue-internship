<template>
  <div
    class="movie-card col-lg-2 col-md-2 col-sm-3 col-5 m-3 p-0"
    @click="goToMoviePage"
  >
    <div class="card">
      <div class="card-image flex-grow-1">
        <img
          class="card-img-top"
          :src="url"
          :alt="item.title+' poster image'"
        >
        <p class="h4 card-rating">
          {{ item.vote_average }}
        </p>
      </div>
      <div class="card-body flex-grow-0">
        <div class="card-title h5 overflow-hidden">
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
import { pathFooPoster } from '@/api/tmdb-api'

export default {
  name: 'MovieCard',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
    computed: {
      url() {
        return `${pathFooPoster}${this.item.poster_path}`
      }
  },
  methods:{
    goToMoviePage(){
      this.$router.push({ name: 'movie-page', params: { id: this.item.id } })
    }
  }
}
</script>

<style lang="scss">
.card{
  min-height: 100%;
  transition-duration: 0.2s;
  color: #fff;
  background-color: #13152E;
  overflow: hidden;
  box-shadow: 0 4px 1.5rem 0px rgba(0, 0, 0, 0.6);
  &:hover{
    transform: scale(1.1);
    box-shadow: 0 0px 1rem 0px rgba(255, 255, 255, 0.4);
  }
}
.card:active .card-body{
  color: black;
  background-color: #fff;
}
.card-title{
  white-space: nowrap;  
}
.card-image{
  position: relative;
}
.card-rating{
  padding: 3px 5px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #13152E;
  border: 1px solid #fff;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 5px;
}
</style>