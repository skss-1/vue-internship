<template>
  <div class="item-card col-lg-2 col-md-2 col-sm-3 col-5 m-3 p-0"> 
    <div
      class="card"
      tabindex="0"
      @click="goToItemPage"
      @keydown.enter.space="goToItemPage"
    >
      <div class="card-image flex-grow-1 d-flex">
        <img
          class="card-img-top"
          :src="itemInfo.url"
          :alt="itemInfo.title+' poster image'"
        >
        <p
          v-if="item.vote_average"
          class="h4 card-rating"
        >
          {{ item.vote_average }}
        </p>
      </div>
      <div
        class="card-body flex-grow-0" 
        :title="itemInfo.title"
      >
        <div class="card-title h5 overflow-hidden">
          {{ itemInfo.title }}
        </div>
        <div class="card-text d-flex justify-content-between gap-2">
          <p class="card-type h6 fw-normal">
            {{ itemInfo.type }}
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
    },
  },
  computed: {
    itemInfo() {
      switch(this.item.media_type) {
        case 'tv':
          return { title: this.item.name, type: 'TV', url: this.item.poster_path? `${posterPath}${this.item.poster_path}`: require('../assets/no-image.png') };
        case 'person':
          return { title: this.item.name, type: 'Person', url: this.item.profile_path? `${posterPath}${this.item.profile_path}`: require('../assets/no-profile-image.png') };
        case 'movie':
        default:
          return { title: this.item.title, type: 'Movie', url: this.item.poster_path? `${posterPath}${this.item.poster_path}`: require('../assets/no-image.png') };
      }
    },
    date() {
      if(this.item.release_date) {
        const  itemDate = new Date(Date.parse(this.item.release_date));
        return itemDate.toLocaleString('en', {  year: 'numeric'  });
      }
        return '';
    }
  },
  methods: {
    goToItemPage() {
      switch(this.item.media_type) {
        case 'tv':
          this.$router.push({ name: 'tv-page', params: { id: this.item.id } });
          break;
        case 'person':
            this.$router.push({ name: 'person-page', params: { id: this.item.id } });
          break;
        default:
        case 'movie':
          this.$router.push({ name: 'movie-page', params: { id: this.item.id } });
          break;
      }
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
  text-overflow: ellipsis;
}
.card-image{
  position: relative;
  min-height:200px;
  img{
    object-fit: cover;
  }
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