<template>
  <div class="row g-4">
    <form
      class="col-lg-9 col-xl-8 col-xxl-7 d-flex justify-content-between position-relative"
    >
      <input
        v-model.trim="searchValue"
        class="form-control border-0 rounded-5"
        type="search"
        placeholder="Search"
        aria-label="Search"
      >
      <span class="search material-symbols-outlined position-absolute">
        search
      </span>
      <button 
        class="btn btn-light ms-sm-3 ms-md-4 ms-xl-3 ms-xxl-4" 
        type="submit"
        @click.prevent="onSubmit"
      >
        Search
      </button>
    </form>
    <div class="col search-filter d-flex flex-wrap align-items-center justify-content-center">
      <div class="row w-100 g-sm-3 g-md-0 justify-content-start">
        <div class="col ps-sm-0 col-md-6 w-auto align-self-center order-last order-md-first form-checks">
          <input
            id="flexCheckDefault"
            v-model="adultIncluded"
            class="form-check-input me-2"
            type="checkbox"
          >
          <label
            class="form-check-label"
            for="flexCheckDefault"
          >
            Include adult
          </label>
        </div>
        <!-- <select
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select year"
        >
          <option selected>
            Year
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
        </select>
        <select
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select region"
        >
          <option selected>
            Region
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
        </select>
        <select
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select language"
        >
          <option selected>
            Language
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
          <option>
            empty
          </option>
        </select> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchValue: '',
      adultIncluded: false,
    };
  },
  computed: {
    isNewSearchValue() {
      return this.searchValue !== this.$route.query.query
    },
    isNewAdultIncluded() {
      return this.adultIncluded !== this.booleanQueryAdultIncluded
    },
    isNewSearch() {
      return this.isNewSearchValue || this.isNewAdultIncluded
    },
    booleanQueryAdultIncluded() {
      return this.$route.query.include_adult === 'true'? true : false
    }
  },
  watch: { 
      '$route.query': {
          handler: function() {
            if (!!this.$route.query.query && this.isNewSearchValue) {
              this.searchValue = this.$route.query.query
              this.adultIncluded = this.booleanQueryAdultIncluded
              this.fetchData()
            } else if (this.$route.query.query === undefined) {
              this.searchValue = ''
              this.adultIncluded = false
            }
          },
          deep: true,
          immediate: true
        }
  },
  created() {
    this.searchValue = this.$route.query.query
    this.adultIncluded = this.booleanQueryAdultIncluded
  },
  methods: {
    onSubmit() {
      if (this.searchValue && this.isNewSearch) {
        this.fetchData()
          .then(() => {
            this.$router.push({
              path: '/search',
              query: {
                include_adult:this.adultIncluded,
                query: this.searchValue
              }
            })
          })
      }
    },
    fetchData() {
      return this.$store.dispatch('search/searchMovie', {
        searchValue: this.searchValue,
        adultIncluded: this.adultIncluded,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  color: #fff;
}
.form-control {
  padding: 13px 30px 13px 85px;
  max-width: 600px;
  background-color: $details-bg-color;
  color: #fff;
  &::placeholder {
    color: $white;
  }
  &:focus {
    &::placeholder, + .search {
      color: #000;
    }
  }
}

.form-check-input {
  background-color: inherit;
  border: 2px solid $white;
}
.search {
  left: 38px;
  top: 11px;
  font-size: 32px;
  color: currentColor;
}

.btn {
  padding: 0px 40px;
}

select {
  padding: 7px 75px 7px 20px;
  width: auto;
  height: 32px;
  border: none;
  color: #fff;
  background-color: $details-bg-color;
  font-size: 16px;
  line-height: 19.36px;
}
</style>