<template>
  <v-app>
    <navbar />
    <v-main>
      <Nuxt /> 
    </v-main>
    <v-fab-transition>
      <v-btn
        fab
        large
        elevation="1"
        color="success"
        class="v-btn--example"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<style scoped>
.v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>