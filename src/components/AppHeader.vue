<template>
  <header class="py-4 py-sm-4 py-md-5">
    <div class="container text-white">
      <nav class="row gx-3 nav mb-4 navbar-expand-md navbar-dark">
        <div class="col-12 col-md-3 col-lg-2 d-flex justify-content-between align-items-center px-3">
          <a
            class="logo-link"
            href="/"
          >
            <span class="navbar-brand logo-icon material-symbols-outlined text-white">
              movie
            </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </div>
        <div
          id="navbarSupportedContent"
          class="collapse navbar-collapse w-auto"
        >
          <div class="col col-md-9 col-lg-10 col-xl-10 d-flex align-items-right w-100">
            <ul class="navbar-nav flex-column flex-md-row w-100">
              <li class="nav-item text-right me-0 me-md-4 me-lg-5">
                <router-link
                  to="/popular"
                  class="nav-link text-end"
                  :class="popularDisabledClass"
                >
                  Popular
                </router-link>
              </li>
              <li class="nav-item nav-item me-0 me-md-4 me-lg-5">
                <router-link
                  to="/top-rated"
                  class="nav-link text-end"
                  :class="topRatedDisabledClass"
                >
                  Top Rated
                </router-link>
              </li>
              <li class="nav-item me-0 me-md-4 me-lg-5">
                <router-link
                  to="/upcoming"
                  class="nav-link text-end"
                  :class="upcomingDisabledClass"
                >
                  Upcoming
                </router-link>
              </li>
              <li class="nav-item me-0 ms-auto notes rounded-pill d-flex align-items-center">
                <router-link
                  to="/release-notes"
                  class="nav-link text-center"
                  :class="upcomingDisabledClass"
                >
                  Release notes
                </router-link>
              </li>
            </ul>
          </div>
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

  .notes {
    border: 2px solid var(--bs-nav-link-color);
    padding: 0px 8px;
    white-space: normal;
    font-size: 18px;
    font-style: italic;
    width: 100px;
    a {
      padding: 0 2px;
      line-height: 1;
    }
  }
</style>