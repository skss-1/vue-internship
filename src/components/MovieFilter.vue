<template>
  <div class="movie-filter container text-center  px-3 py-2">
    <select
      class="form-select form-select-sm"
      @change="$emit('change',$event.target.value)"
    >
      <option value="popular">
        Popular
      </option>
      <option
        value="top-rated"
      >
        Top Rated
      </option>
      <option value="upcoming">
        Upcoming
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MovieFilter',
  model:{
    prop:'value',
    event:'change',
  }
}
</script>

<style scoped>
.form-select{
  width:25%;
}
</style>