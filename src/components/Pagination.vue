<template>
  <nav
    class="d-flex justify-content-center"
    aria-label="Page navigation example"
  >
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          :class="prevDisabled"
          href="#"
          :tabindex="prevTabIndex"
          @click.prevent="currentPage = 1"
        >First</a>
      </li>
      <li class="page-item">
        <a
          id="prev"
          class="page-link"
          :class="prevDisabled"
          :tabindex="prevTabIndex"
          href="#"
          @click.prevent="changeCurrentPage"
        >Previous</a>
      </li>
      <template v-if="totalPages <= 5">
        <pagination-item
          :page="1"
          :current-page="currentPage"
          @onClick="switchCurrentPage"
        />
        <pagination-item
          v-if="totalPages > 1"
          :page="2"
          :current-page="currentPage"
          @onClick="switchCurrentPage"
        />
        <pagination-item
          v-if="totalPages > 2"
          :page="3"
          :current-page="currentPage"
          @onClick="switchCurrentPage"
        />
        <pagination-item
          v-if="totalPages > 3"
          :page="4"
          :current-page="currentPage"
          @onClick="switchCurrentPage"
        />
        <pagination-item
          v-if="totalPages > 4"
          :page="totalPages"
          :current-page="currentPage"
          @onClick="switchCurrentPage"
        />
      </template>
      <template v-if="totalPages > 5">
        <template v-if="currentPage > totalPages - 2">
          <pagination-item
            :page="currentPage > 3 ? '...' : 1"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="totalPages - 3"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="totalPages - 2"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="totalPages - 1"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="totalPages"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
        </template>
        <template v-else>
          <pagination-item
            :page="currentPage > 3 ? '...' : 1"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="currentPage > 3 ? currentPage - 1 : 2"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="currentPage > 3 ? currentPage : 3"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="currentPage > 3 ? currentPage + 1 : 4"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
          <pagination-item
            :page="currentPage + 2 === totalPages ? totalPages : '...'"
            :current-page="currentPage"
            @onClick="switchCurrentPage"
          />
        </template>
      </template>
      <li class="page-item">
        <a
          id="next"
          class="page-link"
          :class="nextDisabled"
          href="#"
          :tabindex="nextTabIndex"
          @click.prevent="changeCurrentPage"
        >Next</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          :class="nextDisabled"
          :tabindex="nextTabIndex"
          @click.prevent="currentPage = totalPages"
        >Last</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import PaginationItem from '@/components/PaginationItem.vue';

export default {
  name: 'Pagination',
  components: { PaginationItem },
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
  },
  data() {
    return{
      currentPage: this.page,
    }
  },
  computed: {
    nextDisabled() {
      return this.currentPage === this.totalPages ? 'disabled' : ''
    },
    prevDisabled() {
      return this.currentPage === 1 ? 'disabled' : ''
    },
    nextTabIndex() {
      if (this.currentPage === this.totalPages) {
        return -1
      } else {
        return 0
      }
    },
    prevTabIndex() {
      if (this.currentPage === 1) {
        return -1
      } else {
        return 0
      }
    }
  },
  watch: {
    'currentPage': {
      handler: function() {
        this.$emit('onChange', this.currentPage)
        document.querySelector('header').scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    },
    '$route.path': {
      handler: function() {
        this.currentPage = this.page
      }
    }
  },
  
  methods: {
    switchCurrentPage(page) {
      this.currentPage = page
    },
    changeCurrentPage(event) {
      if (this.currentPage !== this.totalPages) {
        if (event.target.id === 'next') {
          this.currentPage+=1
        } else {
          this.currentPage-=1
        }
      }
    },
  }
}
</script>