<template>
  <div
    v-if="reviews.length"
    class="review-section py-4 text-center"
  >
    <button
      class="toggle-window btn btn-lg btn-light"
      @click="toggleWindow"
      @keydown.prevent.stop.enter.space="toggleWindow"
    >
      {{ toggleText }}
    </button>
    <div
      v-if="windowOpen"
      class="review-list py-4"
    >
      <div
        v-for="(review,index) in reviews"
        :key="review.id"
        tabindex="0"
        class="review mx-2 my-4 border border-light d-flex gap-4 p-3 rounded"
      >
        <div
          v-if="review.author_details"
          class="author-info"
          :title="review.author_details.username"
        >
          <img
            :src="imageUrl(index)"
            :alt="`${review.author_details.username}-image`"
            class="author-image"
          >
          <div class="author-name py-2">
            {{ review.author_details.username }}
          </div>
        </div>
        <div class="review-content text-start">
          {{ review.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewSection',
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
        windowOpen:false,
    }
  },
  computed:{
    toggleText() {
      return this.windowOpen? 'Hide Reviews': 'Show Reviews';
    },
  },
  methods: {
    toggleWindow() {
      this.windowOpen = !this.windowOpen;
      console.log(this.reviews)
    },
    imageUrl(index) {
      return this.reviews[index].author_details.avatar_path && /^https?:\/\//.test(this.reviews[index].author_details.avatar_path.slice(1)) ? this.reviews[index].author_details.avatar_path.slice(1) : require('../assets/no-profile-image.png')
    },
  }
}
</script>

<style lang="scss" scoped>
.author-info{
  flex: 0 0 10%;
  max-width: 10%;
  min-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  .author-image{
    width: 100%;
    border-radius: 50%;
  }
}
.review{
  .review-content{
    overflow: hidden;
  }
  &:focus{
    box-shadow: 0 0px 1rem 0px rgba(255, 255, 255, 0.4);
  }
}
</style>