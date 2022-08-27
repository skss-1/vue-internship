<template>
  <div class="search-wrapper">
    <div class="container">
      <form
        class="search-form"
        @submit.prevent="onSubmit"
      >
        <img
          class="search-icon"
          src="../assets/search.svg"
          alt="Search"
          width="20"
        >
        <input
          v-model.trim="searchValue"
          class="search-input"
          type="text"
          placeholder="Search"
        >
        <label class="search-adult">  
          <span>Include adult</span>
          <input
            v-model="adultIncluded"
            type="checkbox"
          >
        </label>
      </form>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'SearchComponent',
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
  },
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

.search-adult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: #888888;
}

.search-wrapper {
  padding: 10px 0;
  background-color: #2f2f2f;
}
</style>