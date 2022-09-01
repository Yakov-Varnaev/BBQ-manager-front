<template>
  <div class="center-card d-flex justify-content-center align-items-center">
    <div>
      <h2>{{ employee.first_name }} {{ employee.last_name }}</h2>
      <div class="text-muted d-flex align-items-center justify-content-between">
        <h3 class="m-0 p-0">{{ employee.position }}</h3>
        <span>{{ employee.coefficient }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        first_name: '',
        last_name: '',
        position: '',
        coefficient: 0
      }
    }
  },
  props: {
  },
  methods: {
    async fetchEmployee() {
      const response = await this.$axios.get(`/employees/${this.$route.params.id}/`)
      this.employee = response.data
    }
  },
  mounted() {
    this.fetchEmployee()
  }

}
</script>

<style scoped>
.center-card {
  height: 80vh;
}
</style>>