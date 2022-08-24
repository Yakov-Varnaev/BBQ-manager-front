<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <nuxt-link class="navbar-brand" exact to="/">BBQ</nuxt-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <i class="bi bi-list"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <nuxt-link class="nav-link mx-1" aria-current="page" active-class="active" to="/procedures">Procedures</nuxt-link>
        <nuxt-link class="nav-link mx-1" aria-current="page" active-class="active" to="/employees">Employees</nuxt-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">

</style>>