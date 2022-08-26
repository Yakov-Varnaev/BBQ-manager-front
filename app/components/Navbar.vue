<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <nuxt-link class="navbar-brand text-dark" exact to="/">BBQ</nuxt-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <nuxt-link
          v-for="url in urls"
          class="nav-link mx-1"
          aria-current="page"
          active-class="active"
          :to="url.to"
          :key="url.to"
        >
          {{ url.text }}
        </nuxt-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      urls: [
        {to: '/procedures', text: 'Procedures'},
        {to: '/employees', text: 'Employees'},
        {to: '/materials', text: 'Materials'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">

</style>>