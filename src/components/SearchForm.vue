<template>
  <div class="search-wrapper">
    <div class="container">
      <form
        class="search-form"
        @submit.prevent="onSubmit"
      >
        <img
          class="search-icon"
          src="@/assets/search.svg"
          alt="Search"
          width="20"
        >
        <input
          v-model.trim="searchValue"
          class="search-input"
          type="text"
          placeholder="Search"
        >
        <div class="form-check">
          <label
            class="form-check-label"
            for="flexCheckDefault"
          >
            Include adult
          </label>
          <input
            id="flexCheckDefault"
            v-model="adultIncluded"
            class="form-check-input"
            type="checkbox"
          >
        </div>
      </form>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchValue: '',
      prevSearchValue: '',
      adultIncluded: false,
      prevAdultIncluded: ''
    };
  },
  computed: {
    isNewSearchValue() {
      return this.searchValue !== this.prevSearchValue
    },
    isNewAdultIncluded() {
      return this.adultIncluded !== this.prevAdultIncluded
    },
    isNewSearch() {
      return this.isNewSearchValue || this.isNewAdultIncluded
    }
  },
  watch: { 
      '$route.query': {
          handler: function(query) {
            this.searchValue = this.$route.query.query
            this.adultIncluded = this.$route.query.include_adult
          },
          deep: true,
          immediate: true
        }
  },
  created() {
    if (this.$route.path === '/') {
      this.$router.push({ query:{} }).catch(err => {})
    }
  },
  methods: {
    onSubmit() {
      if (this.searchValue && this.isNewSearch) {
        this.prevSearchValue = this.searchValue
        this.prevAdultIncluded = this.adultIncluded
        this.$store.dispatch('search/searchMovie', {
          searchValue: this.searchValue,
          adultIncluded: this.adultIncluded,
        });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
}

.search-input {
  padding: 0;
  margin-left: 10px;
  width: 100%;
  border: none;
  outline: 0;
  background-color: transparent;
  color: #888888;
  &::placeholder {
    color: #505050;
  }
}

.form-check {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  color: #888888;
  label {
    white-space: nowrap;
  }
  input {
    margin-left: 0;
  }
}

.search-wrapper {
  padding: 10px 0;
  background-color: #2f2f2f;
}
</style>