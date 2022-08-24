<template>
  <div>
    <div class="heading">
      <h2>{{employee.first_name}} {{employee.last_name}}</h2>
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
      }
    }
  },
  props: {
  },
  methods: {
    async fetchEmployee() {
      const response = await this.$axios.get(`/employees/${this.$route.params.id}/`)
      console.log(response.data)
      this.employee = response.data
    }
  },
  mounted() {
    this.fetchEmployee()
  }

}
</script>

<style>

</style>