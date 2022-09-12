<template>
  <div class="videos-scroll my-5">
    <div class="fs-3 video-heading m-3 text-center"> 
      Rlated Videos 
    </div>
    <div class="video container text-center p-0">
      <iframe
        class="trailer"
        :src="`https://www.youtube.com/embed/${videos[currentVideo].key}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
      console.log('next' + this.currentVideo)
      console.log('next' + this.currentVideo)
      this.currentVideo < this.videos.length && this.currentVideo++;
    },
    prev() {
      console.log('prev' + this.currentVideo)
      this.currentVideo > 0 && this.currentVideo--;
    },
  }

}
</script>

<style scoped lang="scss">
.trailer{
  width: 70vw;
  height: calc(70vw / 1.73);
  max-width: 100%;
}
.videos-scroll{
  border-right: 15px double #fff;
  border-left: 15px double #fff;
  button{
    color: #020916;
    border-color: #020916;
  }
}
</style>