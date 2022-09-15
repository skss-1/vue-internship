<template>
  <div class="note-view text-white mt-5 pb-5">
    <ul class="container d-flex flex-column justify-content-center align-items-start">
      <li
        v-for="(note, i) in releaseNotes"
        :key="note + ' ' + i"
        class="fs-4 py-2"
      >
        {{ note }}
      </li>
    </ul>
    <div />
  </div>
</template>

<script>

export default {
  name: 'NoteView',
  data(){
    return {
      releaseNotes: [
        'Popular, Top rated, Upcoming movies links',
        'Multi-search',
        'Filter by year, region, language, adult content',
        'Person, Tv, Movie cards',
        'Person, Tv, Movie details pages',
        'Movie trailer for movie page',
        'Review section for movie page',
        'Pagination',
        'Credits scroll with actors',
        'Loading spinner',
        'Deploy on environment'
      ]
    }
  }
}
</script>