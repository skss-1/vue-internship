<template>
  <header>
    <div class="header-wrapper">
      <div class="container">
        <nav>
          <div class="nav-wrapper">
            <a
              class="logo-link"
              href="/"
            >
              <img
                class="logo-image"
                src="../assets/logo.svg"
                alt="logo"
                width="50"
              >
              <span class="logo-title">CINEMA-PROJECT</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
    <search-form />
  </header>
</template>

<script>
import SearchForm from './SearchForm.vue';

export default {
    name: 'AppHeader',
    components: {
        SearchForm,
    },
};
</script>

<style lang="scss" scoped>
.logo-image {
  display: block;
  margin-right: auto;
}

.logo-link {
  display: inline-flex;
  align-items: flex-end;
  color: #fff;
  text-decoration: none;
}

.logo-title {
  margin-left: 10px;
  font-size: 25px;
  white-space: nowrap;
}

nav {
  padding: 0;
}

.header-wrapper {
  padding: 20px 0;
  background: linear-gradient(90deg, rgba(57,117,11,1) 0%, 
          rgba(121,193,66,1) 35%, rgb(177, 245, 125) 100%);
}

.nav-wrapper {
  display: flex;
  justify-content: flex-start;
}
</style>
