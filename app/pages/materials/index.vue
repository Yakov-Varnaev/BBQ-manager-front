<template>
  <div class="container">
    <common-heading>
      <h2>Material</h2>
      <button class="btn text-success">
        <!-- <h4 class="m-0 p-0"> -->
          <!-- <i class="bi bi-plus-lg"></i> -->
          <i class="bi bi-plus-circle"></i>
          Add
        <!-- </h4> -->
      </button>
    </common-heading>
    <CommonTable class="mt-2 col-lg-8 offset-lg-2">
      <material-item
        v-for="material in materials"
        :key="material.id"
        :material="material"
        @remove="deleteMaterial(material)"
      />
    </CommonTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [],
    }
  },
  methods: {
    async fetchMaterials() {
      try {
        const response = await this.$axios.get('/materials/')
        this.materials = response.data
      } catch({response}) {
        console.log(response)
      }
    },
    async deleteMaterial(material) {
      console.log('remove', material)
      try {
        const response = await this.$axios.delete(`/materials/${material.id}/`)
      } catch ({response}) {
        console.log(response)
      }
    }
  },
  mounted() {
    this.fetchMaterials()
  }
}
</script>

<style>

</style>