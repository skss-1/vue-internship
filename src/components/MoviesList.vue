<template>
  <div class="movie-list container ">
    <div class="row  ">
      <movie-card
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'
export default {
    components:{
        MovieCard
    },
    props:{
        items:{
            type:Array,
            required:true,
        }
    }

}
</script>

<style>

</style>