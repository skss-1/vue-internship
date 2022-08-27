<template>
  <div class="movie-filter container text-end  px-3">
    <select
      class="form-select form-select-sm"
      @change="$emit('change',$event.target.value)"
    >
      <option value="popular">
        PopularMovies
      </option>
      <option
        value="top-rated"
      >
        TopRated
      </option>
      <option value="upcoming">
        UpcomingMovies
      </option>
    </select>
  </div>
</template>

<script>
export default {
model:{
    prop:'value',
    event:'change',
}
}
</script>

<style>

</style>