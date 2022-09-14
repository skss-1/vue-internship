<template>
  <div
    v-if="videos"
    class="videos-scroll my-5"
  >
    <div class="fs-3 video-heading m-3 text-center"> 
      Related Videos 
    </div>
    <div class="video container text-center p-0">
      <iframe
        class="trailer"
        :src="`https://www.youtube.com/embed/${videos[currentVideo].key}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
    <div class="controls d-flex justify-content-center gap-3 my-2">
      <button
        type="button"
        class="btn-prev btn btn-light btn-md px-3"
        @click="prev"
        @keydown.enter.space="prev"
      >
        Prev
      </button>
      <button
        type="button"
        class="btn-next btn btn-light btn-md px-3"
        @click="next"
        @keydown.enter.space="next"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideosScroll',
  props: {
    videos: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      currentVideo: 0,
    }
  },
  methods: {
    next() {
      this.currentVideo < this.videos.length && this.currentVideo++;
    },
    prev() {
      this.currentVideo > 0 && this.currentVideo--;
    },
  }
}
</script>

<style scoped lang="scss">
.videos-scroll{
  --basic-youtube-aspect-ratio: 1.73;
  border-right: 20px solid #fff;
  border-left: 20px solid #fff;
  button{
    color: #020916;
    border-color: #020916;
  }
}
.trailer{
  width: 70vw;
  height: calc( 70vw / var(--basic-youtube-aspect-ratio) );
  max-width: 100%;
}
</style>