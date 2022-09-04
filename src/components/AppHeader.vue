<template>
  <header class="py-sm-4 py-md-5">
    <div class="container text-white">
      <nav class="row gx-3 nav mb-4">
        <div class="col-12 col-md-3 col-lg-2">
          <a
            class="logo-link"
            href="/"
          >
            <span class="navbar-brand logo-icon material-symbols-outlined text-white">
              movie
            </span>
          </a>
        </div>
        <div class="col col-md-9 col-lg-10 col-xl-10 d-flex align-items-center">
          <ul class="navbar-nav flex-row">
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >Popular</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >Top Rated</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="#"
              >Recent</a>
            </li>
          </ul>
        </div>
      </nav>
      <search-form />
    </div>
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
  header {
    background-color: #0F1622;
  }

  .logo-icon {
    font-size: 89px;
  }
  .nav-item {
    font-size: 32px;
    line-height: 38.73px;
  }
  .nav-item:not(:last-child) {
    margin-right: 50px;
  }
</style>