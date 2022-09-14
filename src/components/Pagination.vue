<template>
  <nav
    class="d-flex justify-content-center mt-5"
    aria-label="Page navigation example"
  >
    <ul class="pagination">
      <li class="page-item me-md-1">
        <a
          class="page-link pe-2 ps-1 py-sm-2 px-sm-3 px-lg-4 d-flex h-100 juctify-content-center align-items-center"
          :class="prevDisabled"
          href="#"
          :tabindex="prevTabIndex"
          @click.prevent="currentPage = 1"
        >
          <span class="d-none d-sm-inline">First</span>
          <span class="arrow-right material-symbols-outlined d-sm-none">
            keyboard_double_arrow_left
          </span>
        </a>
      </li>
      <li class="page-item me-md-1">
        <a
          id="prev"
          class="page-link pe-2 ps-1 py-sm-2 px-sm-3 px-lg-4 d-flex h-100 juctify-content-center align-items-center"
          :class="prevDisabled"
          :tabindex="prevTabIndex"
          href="#"
          @click.prevent="changeCurrentPage"
        >          
          <span class="d-none d-sm-inline">Prev</span>
          <span class="arrow-left material-symbols-outlined d-sm-none">
            chevron_left
          </span>
        </a>
      </li>
      <template v-if="totalPages <= 5">
        <pagination-item
          v-for="item in totalPages"
          :key="item"
          :page="item"
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
        <template v-if="currentPage > totalPages - 2">
          <pagination-item
            v-for="item in 4"
            :key="item"
            :current-page="currentPage"
            :page="totalPages - (4 - item)"
            @onClick="switchCurrentPage"
          />
        </template>
        <template v-else>
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
      <li class="page-item me-md-1">
        <a
          id="next"
          class="page-link ps-1 pe-2 py-sm-2 px-sm-3 px-lg-4 d-flex h-100 juctify-content-center align-items-center"
          :class="nextDisabled"
          href="#"
          :tabindex="nextTabIndex"
          @click.prevent="changeCurrentPage"
        >
          <span class="d-none d-sm-inline">Next</span>
          <span class="arrow-right material-symbols-outlined d-sm-none ">
            chevron_right
          </span>
        </a>
      </li>
      <li class="page-item me-md-1">
        <a
          class="page-link ps-1 pe-2 py-sm-2 px-sm-3 px-lg-4 d-flex h-100 juctify-content-center align-items-center"
          href="#"
          :class="nextDisabled"
          :tabindex="nextTabIndex"
          @click.prevent="currentPage = totalPages"
        >
          <span class="d-none d-sm-inline">Last</span>
          <span class="arrow-right material-symbols-outlined d-sm-none">
            keyboard_double_arrow_right
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import PaginationItem from '@/components/PaginationItem.vue';

export default {
  name: 'Pagination',
  components: { PaginationItem },
  data() {
    return{
      currentPage: this.page,
      currentPath: this.$route.path
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
    },
    routePage() {
      if (this.$route.query.page === undefined) {
        return 1
      } else {
        return +this.$route.query.page
      }
    },
    page() {
      return this.$store.getters['search/getCurrentPage']
    },
    totalPages() {
      return this.$store.getters['search/getTotalPages']
    },
  },
  watch: {
    'currentPage': {
      handler: function() {
        if (this.$route.path === '/search') {
          if (this.currentPage !== this.page) {
            this.currentPage === this.page
            this.changePage()
            this.scrollUp()
          return
          }
        } else {
          if (this.currentPage !== this.page && this.currentPath === this.$route.path) {
            this.changePage()
            this.scrollUp()
            return
          }
          if (this.currentPath !== this.$route.path) {
            this.currentPath = this.$route.path
          }
          if (this.routePage !== this.currentPage) {
            this.pageReset()
          }
        }
      }
    },
    '$route.query': {
      handler: function() {
        if (this.$route.path !== '/search') {
          this.currentPage = this.page
          if (this.routePage !== this.currentPage) {
            this.pageReset()
          }
        }
        if (this.$route.path === '/search') {
          console.log('watcher')
          if (this.currentPath !== this.$route.path) {
            this.currentPath = this.$route.path
          }
          if (this.routePage !== this.currentPage) {
            this.pageReset()
          }
        }
      }
    }
  },
  created() {
    this.currentPage = Number(this.$route.query.page) || 1
  },
  methods: {
    switchCurrentPage(page) {
      this.currentPage = page
    },
    changeCurrentPage(event) {
      if (event.currentTarget.id === 'next') {
        this.currentPage+=1
      } else if (event.currentTarget.id === 'prev') {
        this.currentPage-=1
      }
    },
    pageReset() {
      this.currentPage = 1
    },
    scrollUp() {
      document.querySelector('header').scrollIntoView({ block: 'center', behavior: 'smooth' })
    },
    changePage() {
      this.$emit('onChange', this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-link {
    background-color: $secondary-bg-color;
    color: $white;
  }
  .disabled {
    color: gray;
  }
  .arrow-right {
    width: 20px;
  }
  .arrow-left {
    width: 20px;
  }
  .active {
    background-color: $white;
    color: $secondary-bg-color;
    border-color: $white;
  }
</style>