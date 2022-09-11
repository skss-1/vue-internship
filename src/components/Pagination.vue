<template>
  <nav
    class="d-flex justify-content-center mt-5"
    aria-label="Page navigation example"
  >
    <ul
      class="pagination"
      :class="paginationClass"
    >
      <li class="page-item">
        <a
          class="page-link py-0 d-flex h-100 juctify-content-center align-items-center"
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
      <li class="page-item">
        <a
          id="prev"
          class="page-link py-0 d-flex h-100 juctify-content-center align-items-center"
          :class="prevDisabled"
          :tabindex="prevTabIndex"
          href="#"
          @click.prevent="changeCurrentPage"
        >          
          <span class="d-none d-sm-inline">Prev</span>
          <span class="arrow-right material-symbols-outlined d-sm-none">
            chevron_left
          </span>
        </a>
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
          class="page-link py-0 d-flex h-100 juctify-content-center align-items-center"
          :class="nextDisabled"
          href="#"
          :tabindex="nextTabIndex"
          @click.prevent="changeCurrentPage"
        >
          <span class="d-none d-sm-inline">Next</span>
          <span class="arrow-right material-symbols-outlined d-sm-none">
            chevron_right
          </span>
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link py-0 d-flex h-100 juctify-content-center align-items-center"
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
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    query: {
      type: String,
      default: '',
      required: false
    },
    adultIncluded: {
      type: Boolean,
      default: false,
      required: false
    }

  },
  data() {
    return{
      currentPage: this.page,
      currentQuery: this.query,
      currentAdultIncludet: this.adultIncluded,
      currentRoute: this.route
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
    booleanQueryAdultIncluded() {
      return this.$route.query.include_adult === 'true'? true : false
    },
    routePage() {
      if (this.$route.query.page === undefined) {
        return 1
      } else {
        return +this.$route.query.page
      }
    },
    screenWidth() {
      return document.querySelector('header').offsetWidth
    },
    paginationClass() {
      if (this.screenWidth > 576 && this.screenWidth < 1024) {
        return 'pagination'
      } else if (this.screenWidth > 1024) {
        return 'pagination-lg'
      } else {
        return 'pagination-sm'
      }
    }
  },
  watch: {
    'currentPage': {
      handler: function() {
        if (this.currentRoute !== '/search') {
          if (this.currentPage !== this.routePage && this.currentRoute === this.$route.path) {
            this.changePage()
            this.scrollUp()
          }
          // if (this.currentRoute !== this.$route.path) {
          //   this.pageReset()
          //   this.currentRoute = this.$route.path
          //   this.changeParams()
          //   this.changePage()
          // }
        }
        if (this.currentRoute === '/search') {
          if (this.currentPage !== this.page) {
            this.changeParams()
            this.changePage()
            this.scrollUp()
          }
          return
        }
      }
    },
    '$route': {
      handler: function() {
        if (this.$route.path !== '/search') {
          if (this.$route.path !== this.currentRoute) {
            this.currentRoute = this.$route.path
            this.pageReset()
          }
          // if (this.$route.query.query !== this.currentQuery) {
          //   this.pageReset()
          //   this.currentQuery = this.$route.query.query
          //   this.changeParams()
          // }
          // if (this.$route.query.include_adult !== this.currentAdultIncludet) {
          //   this.pageReset()
          //   this.currentAdultIncludet = this.$route.query.include_adult
          //   this.changeParams()
          // }
          if (this.$route.path === this.currentRoute && Object.keys(this.$route.query).length === 0) {
            this.pageReset()
            this.changeParams()
          }
        }
        if (this.$route.path === '/search') {
          this.changeParams()
          if (this.$route.query.query !== this.currentQuery || this.booleanQueryAdultIncluded !== this.currentAdultIncludet) {
            console.log(this.$route.query.query, this.currentQuery, this.booleanQueryAdultIncluded, typeof this.currentAdultIncludet)
            this.currentQuery = this.$route.query.query
            this.currentRoute = this.$route.path
            this.currentAdultIncludet = this.booleanQueryAdultIncluded
            this.pageReset()
            this.changeParams()
          }
        }
      }
    }
  },
  created() {
    let screenWidth = document.querySelector('header').offsetWidth
    this.currentPage = +this.$route.query.page || 1
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
    changeParams() {
      this.$emit('change-params', this.currentPage, this.currentQuery, this.currentRoute, this.currentAdultIncludet)
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
  .active {
    background-color: $white;
    color: $secondary-bg-color;
    border-color: $white;
  }
</style>