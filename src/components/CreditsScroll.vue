<template>
  <div class="credits my-3">
    <div
      v-for="actor in credits"
      :key="actor.id"
      class="card actor-card"
    >
      <img
        :src="imageUrl(actor.profile_path)"
        class="card-img-top"
        :alt="`${actor.name}-image`"
      >
      <div class="card-body p-1">
        <p class="card-text text-center fw-lighter">
          {{ actor.name }}
        </p>
      </div>
    </div> 
  </div>
</template>

<script>
import { posterPath } from '@/api/tmdb-api'

export default {
    name: 'CreditsScroll',
    props: {
        credits: {
            type: Array,
            required: true
        }
    },
    methods: {
        imageUrl(profile_path) {
            return `${posterPath}${profile_path}`
        },
    }
}
</script>

<style scoped lang="scss">

::-webkit-scrollbar{
  height: 10px;
}
::-webkit-scrollbar-track {
  background: none;
}
::-webkit-scrollbar-thumb {
  margin: 2px;
  background: #020418;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  
  background: #050824;
}
.credits{
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 12%;
    gap: 10px;
    overflow-x: auto;
}

.actor-card{
    padding: 5px;
    background-color: #1f2466;
    img{
        inline-size: 100%;
    }
}
</style>