<template>
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
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      searchValue: '',
      prevSearchValue: '',
      adultIncluded: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.searchValue !== '' && this.searchValue !== this.prevSearchValue) {
        this.prevSearchValue = this.searchValue
        this.$store.dispatch('searchMovie', {
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
  display: none;
  color: #888888;
  @media screen and (min-width: 425px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
}
</style>