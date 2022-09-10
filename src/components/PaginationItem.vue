<template>
  <li class="page-item">
    <a
      class="page-link"
      :class="[activeClass, disabledClass]"
      href="#"
      :tabindex="tabIndex"
      @click.prevent="$emit('onClick', page)"
    >{{ page }}</a>
  </li>
</template>

<script>

export default {
  name: 'PaginationItem',
  props: {
    page: {
      type: [Number, String],
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    activeClass() {
      return {
        active: this.currentPage === this.page
      }
    },
    disabledClass() {
      return {
        disabled: this.page === '...'
      }
    },
    tabIndex() {
      if (this.page === '...') {
        return -1
      } else {
        return 0
      }
    }
  }
}
</script>
