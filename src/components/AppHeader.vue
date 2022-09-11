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
              <router-link
                to="/popular"
                class="nav-link"
                :class="popularDisabledClass"
              >
                Popular
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/top-rated"
                class="nav-link"
                :class="topRatedDisabledClass"
              >
                Top Rated
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/upcoming"
                class="nav-link"
                :class="upcomingDisabledClass"
              >
                Upcoming
              </router-link>
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
    computed: {
      popularDisabledClass() {
        return { disabled : (this.$route.path === '/popular' && this.$route.query.page === '1') }
      },
      topRatedDisabledClass() {
        return { disabled : (this.$route.path === '/top-rated' && this.$route.query.page === '1') }
      },
      upcomingDisabledClass() {
        return { disabled : (this.$route.path === '/upcoming' && this.$route.query.page === '1') }
      }
    }
};
</script>

<style lang="scss" scoped>
  header {
    background-color: $secondary-bg-color;
  }

  .logo-icon {
    font-size: 89px;
  }

  .nav-item {
    font-size: 28px;
  }
  
  .nav-item:not(:last-child) {
    margin-right: 50px;
  }
</style>