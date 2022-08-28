<template>
  <div class="movie-page">
    {{ $route.params.id }}
  </div>
</template>
<script>
export default {
  name: 'MoviePage',
   mounted() {
    this.$store.dispatch('movie/fetchMovieDetails',{ id:this.$route.params.id } );
  }
}
</script>

<style>

</style>