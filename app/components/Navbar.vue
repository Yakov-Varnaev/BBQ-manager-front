<template>
  <v-app-bar elevation="0" app>
    <v-container class="d-flex justify-space-between align-center col-lg-9">
      <div class="d-flex align-center">
        <h2>BBQ</h2>
        <v-divider
          vertical
          class="mx-2"
        ></v-divider>
        <client-only>
        </client-only>
        <h4 v-if="currentObject" class="m-0 p-0"> {{currentObject.address}}</h4>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            class="p-0 m-0"
            >
              <v-icon class="p-0 m-0">mdi-menu-left</v-icon>
            </v-btn>
          </template>
          <v-list
            :items="objects"
          >
            <v-list-item
              v-for="obj in objects"
              :key="obj.id"
              @click="setCurrentObject(obj)"
            >
            <v-list-item-title>{{ obj.address }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="d-flex">
        <v-btn
          class="ms-1"
          text
          v-for="url in urls"
          :key="url.to"
          :to="url.to"
          nuxt
        >
          {{  url.text  }}
        </v-btn>
      </div>
      </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    objects() {
      return this.$store.getters.getObjects
    },
    currentObject() {
      return this.$store.getters.getCurrentObject
    }
  },
  data() {
    return {
      urls: [
        {to: '/procedures', text: 'Procedures'},
        {to: '/employees', text: 'Employees'},
        {to: '/materials', text: 'Materials'},
      ]
    }
  },
  methods: {
    setCurrentObject(obj) {
      this.$store.dispatch('setCurrentObject', obj)
    }
  },
  async mounted() {
    this.$store.dispatch('fetchObjects')
  }
}
</script>

<style scoped lang="scss">

</style>>