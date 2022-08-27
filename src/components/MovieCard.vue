<template>
  <div class="col-md-3 col-lg-2 col-sm-4 bg-primary p-0 h-200">
    <div
      class="card"
    >
      <img
        class="card-img-top"
        :src="url"
        alt="Card image cap"
      >
      <div class="card-body">
        <h5 class="card-title">
          {{ item.title }}
        </h5>
        <p class="card-text" />
        <a
          href="#"
          class="btn btn-primary"
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

</style>