<template>
  <div 
    class="credits-scroll my-3 p-2"
    tabindex="0"
  >
    <div
      v-for="actor in credits"
      :key="actor.id"
      class="card actor-card d-flex"
      tabindex="0"
      @click="goToPersonPage(actor.id)"
      @keydown.enter.esc="goToPersonPage(actor.id)"
    >
      <img
        :src="imageUrl(actor.profile_path)"
        class="card-img-top flex-grow-1"
        :alt="`${actor.name}-image`"
      >
      <div class="card-body p-1 flex-grow-0">
        <p class="card-text text-center fw-lighter">
          {{ actor.name }}
        </p>
      </div>
    </div> 
  </div>
</template>

<script>
import { posterPath } from '@/api/tmdb-api';

export default {
  name: 'CreditsScroll',
  props: {
    credits: {
      type: Array,
      required: true,
    }
  },
  methods: {
    imageUrl(profile_path) {
      return `${posterPath}${profile_path}`;
    },
    goToPersonPage(id) {
      this.$router.push({ name: 'person-page', params: { id: id } });
    }
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar{
  height: 10px;
}
::-webkit-scrollbar-track{
  background: none;
}
::-webkit-scrollbar-thumb{
  margin: 2px;
  background: #020418;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover{
  background: #050824;
}
.credits-scroll{
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 12%;
  gap: 10px;
  overflow-x: auto;
}
.actor-card{
  cursor: pointer;
  padding: 5px;
  background-color: #1f2466;
  transition-duration: 0.2s;
  img{
    inline-size: 100%;
    object-fit: cover;
  }
  &:hover{
    color: #1f2466;
    background-color: #fff;
    font-weight: bold;
  }
}
</style>