<template>
  <div class="movie-card col-lg-2 col-md-2 col-sm-3 col-5 m-3 p-0"> 
    <div
      class="card"
      tabindex="0"
      @click="goToMoviePage"
      @keydown.enter.esc="goToMoviePage"
    >
      <div class="card-image flex-grow-1">
        <img
          class="card-img-top"
          :src="url"
          :alt="item.title+' poster image'"
        >
        <p
          v-if="item.vote_average"
          class="h4 card-rating"
        >
          {{ item.vote_average }}
        </p>
      </div>
      <div class="card-body flex-grow-0">
        <div class="card-title h5 overflow-hidden">
          {{ title }}
        </div>
        <div class="card-text d-flex justify-content-start gap-2">
          <p class="card-type h6 fw-normal">
            {{ type }}
          </p>
          <p
            v-show="date"
            class="h6 card-date fw-lighter"
          >
            {{ date }}  
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { posterPath } from '@/api/tmdb-api';

export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  computed: {
    title() {
      switch(this.item.media_type){
        case 'movie':
          return this.item.title;
        case 'tv':
          return this.item.name;
        case 'person':
          return this.item.name;
        default:
          return 'unknown';
      }
    },
    type() {
      switch(this.item.media_type){
        case 'movie':
          return 'Movie';
        case 'tv':
          return 'TV';
        case 'person':
          return 'Person';
        default:
          return 'unknown';
      }
    },
    url() {
      switch(this.item.media_type){
        case 'movie':
          return `${posterPath}${this.item.poster_path}`;
        case 'tv':
          return `${posterPath}${this.item.poster_path}`;
        case 'person':
          return `${posterPath}${this.item.profile_path}`;
        default:
          return 'unknown';
      }
    },
    date() {
      if(this.item.release_date){
        const  itemDate = new Date(Date.parse(this.item.release_date));
        return itemDate.toLocaleString('en', { year: 'numeric' });
      }
        return null;
    }
  },
  methods: {
    goToMoviePage() {
      this.$router.push({ name: 'movie-page', params: { id: this.item.id } });
    }
  }
}
</script>

<style scoped lang="scss">
.card{
  cursor: pointer;
  min-height: 100%;
  transition-duration: 0.2s;
  color: #fff;
  background-color: #13152E;
  overflow: hidden;
  box-shadow: 0 4px 1.5rem 0px rgba(0, 0, 0, 0.6);
  &:hover {
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
  border-left: none;
  border-top: none;
  border-bottom-right-radius: 5px;
}
</style>