<template>
  <div class="row g-4">
    <form class="col-lg-9 col-xl-8 col-xxl-7 d-flex justify-content-between position-relative">
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
            Adult content
          </label>
        </div>
        <select
          v-model="year"
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select year"
        >
          <option
            selected
            value=""
          >
            Any Year
          </option>
          <option
            v-for="y in yearsForForm"
            :key="y"
            :value="y"
          >
            {{ y }}
          </option>
        </select>
        <select
          v-model="region"
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select region"
        >
          <option
            selected
            value=""
          >
            Any Region
          </option>
          <option
            v-for="reg in regions"
            :key="reg.iso_3166_1"
            :value="reg.iso_3166_1"
          >
            {{ reg.english_name }}
          </option>
        </select>
        <select
          v-model="language"
          class="col col-sm-6 col-md-6 form-select"
          aria-label="Select language"
        >
          <option
            selected
            value=""
          >
            Any Language
          </option>
          <option
            v-for="lang in languages"
            :key="lang.iso_639_1"
            :value="lang.iso_639_1"
          >
            {{ lang.english_name }}
          </option>
        </select>
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
      region: '',
      language: '',
      year: '',
      page: 1,
    };
  },
  computed: {
    isNewSearch() {
      if(JSON.stringify(this.query) === JSON.stringify(this.$route.query)) {
        return false;
      } else {
        return true;
      }
    },
    regions() {
      return this.$store.getters['search/getRegions'];
    },
    languages() {
      return this.$store.getters['search/getLanguages'];
    },
    query() {
      let query = {
        ...(this.searchValue) && { query: this.searchValue || '' },
        ...(this.include_adult) && { include_adult: this.adultIncluded || false },
        ...(this.region) && { region: this.region || '' },
        ...(this.language) && { language: this.language || '' },
        ...(this.year) && { year: this.year || '' },
        ...(this.page) && { page: this.page || 1 },
      }
      return query;
    },
    yearsForForm() {
      const currentYear = new Date().getFullYear();
      const years =[];
      for(let i = currentYear; i>=1900; i--){
        years.push(i);
      }
      return years;
    },
  },
  watch: { 
      '$route.query': {
          handler: function() {
            if (!!this.$route.query.query && this.isNewSearch) {
              this.getDataFromRoute();
              this.fetchData();
            }
          },
          deep: true,
          immediate: true
        }
  },
  created() {
    this.$store.dispatch('search/fetchRegions');
    this.$store.dispatch('search/fetchLanguages');
    this.getDataFromRoute();
  },
  methods: {
    onSubmit() {
      if (this.isNewSearch && this.searchValue) {
        this.fetchData()
          .then(() => {
            this.$router.push({
              path: '/search',
              query: this.query,
            })
          })
      }
    },
    fetchData() {
      return this.$store.dispatch('search/search', { ...this.query });
    },
    getDataFromRoute() {
      this.searchValue = this.$route.query.query ? this.$route.query.query : '';
      this.adultIncluded = this.$route.query.include_adult === 'true' ? true : false;
      this.region = this.$route.query.region ? this.$route.query.region : '';
      this.language = this.$route.query.language ? this.$route.query.language : '';
      this.year = this.$route.query.year ? this.$route.query.year : '';
      this.page = this.$route.query.page ? this.$route.query.page : 1;
    },
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