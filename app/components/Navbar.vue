<template>
  <header>
    <nuxt-link exact to="/">home</nuxt-link>
    <nuxt-link to="/procedures">procedures</nuxt-link>
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
header {
  height: 70px;
  background: $color-secondary;
}
</style>>