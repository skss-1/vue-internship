<template>
  <div
    v-if="isLoading"
    class="loader text-center p-5"
  >
    <div
      class="spinner-border text-light"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div
    v-else-if="!isLoading && isEmpty"
    class="container p-5 h3 text-light"
  >
    Person not found 
  </div>
  <div
    v-else
    class="person-view py-5"
  >
    <div class="person-info container">
      <div class="row">
        <div class="col-4">
          <img
            :src="imageUrl"
            class="card-img-top"
            :alt="`${person.name}-image`"
          >
        </div>
        <div class="col-8">
          <p class="name h1">
            {{ person.name }}
          </p>
          <p class="place-of-birth h3 fw-lighter">
            {{ person.place_of_birth }}
          </p>
          <p
            v-if="person.birthday"
            class="birthday fs-4 fw-lighter"
          >
            <span class="fw-normal">Birthday:</span> {{ birthdayDate }}
          </p>
          <p
            v-if="person.deathday"
            class="deathday fs-4 fw-lighter"
          >
            <span class="fw-normal">Deathday:</span> {{ deathdayDate }}
          </p>
          <div class="fs-3 biography-heading p-2 my-2"> 
            Biography  
          </div> 
          <p class="fs-6 fw-light biography m-0"> 
            {{ person.biography }} 
          </p> 
        </div>
      </div>
    </div>
    <div class="person-credits p-5">
      <p class="h2 roles-heading fw-normal text-center">
        Roles
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <div
          v-for="role in credits"
          :key="role.id"
          tabindex="0"
          class="role-card"
          @click="goToMoviePage(role.id)"
          @keydown.enter.space="goToMoviePage(role.id)"
        >
          <img
            :src="roleImageUrl(role.poster_path)"
            class="card-img-top flex-grow-1"
            :alt="`${role.character}-image`"
          >
          <div class="card-body p-1 flex-grow-0">
            <p class="title text-center my-1">
              {{ role.original_title }}
            </p>
            <p class="fs-6 character-heading text-center fw-lighter my-0 mx-2">
              Role :
            </p>
            <p class="character text-center fw-lighter">
              {{ role.character }}
            </p>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { posterPath } from '@/api/tmdb-api'

export default {
  name: 'PersonView',
  computed: {
    isLoading() {
      return this.$store.getters['person/getIsLoading'];
    },
    isEmpty() {
      return Boolean(!Object.keys(this.person).length);
    },
    person() {
      return this.$store.getters['person/getPerson'];
    },  
    credits() {
      return this.$store.getters['person/getCredits'];
    },
    imageUrl() {
      return this.person.profile_path? `${posterPath}${this.person.profile_path}`: require('../assets/no-profile-image.png')
    },
    birthdayDate() {
      const releaseDate = new Date(Date.parse(this.person.birthday));
      return releaseDate.toLocaleString('en', { dateStyle: 'long' });
    },
    deathdayDate() {
      const releaseDate = new Date(Date.parse(this.person.deathday));
      return releaseDate.toLocaleString('en', { dateStyle: 'long' });
    },
  },
  mounted() {
    this.$store.dispatch('person/fetchPerson',{ id: this.$route.params.id });
  },
  methods: {
    roleImageUrl(url) {
      return url?`${posterPath}${url}`: require('../assets/no-image.png');
    },
    goToMoviePage(id) {
      this.$router.push({ name: 'movie-page', params: { id: id } });
    },
  },
}
</script>

<style scoped lang="scss">
.person-view{
  background-color: #13152E;
  color: #fff;
}
.role-card{
  width: 150px;
  border: 1px solid rgb(152, 130, 130);
  border-radius: 10px;
  overflow: hidden;
  transition-duration: 0.2s;
  .card-img-top{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  .card-body{
    height: 40%;
  } 
  &:hover{
    transform: scale(1.05);
    box-shadow: 0 0px 1rem 0px rgba(255, 255, 255, 0.4);
  }
}
.biography-heading{
  border-left: 1px solid #fff;
}
.character-heading{
  border-top: 3px double #fff;
}
.roles-heading{
  margin-bottom: 20px;
  border-bottom: 3px solid #202246;
}
</style>