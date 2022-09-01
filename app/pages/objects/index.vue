<template>
  <div>
    <common-heading>
      <h2>Objects</h2>
    </common-heading>
    <v-container class="col-lg-8">
      <v-data-table @click:row="selectObject"
        :headers="headers"
        :items="objects"
      >
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objects: [],
      headers: [
        {text: '#', value: 'id'},
        {text: 'Address', value: 'address', align: 'center'},
      ]
    }
  },
  methods: {
    async fetchObjects() {
      const response = await this.$axios.get('/objects/')
      this.objects = response.data
    },
    selectObject(obj) {
      console.log(obj)
    }
  },
  mounted() {
    this.fetchObjects()
  }
}
</script>

<style>

</style>