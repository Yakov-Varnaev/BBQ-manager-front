<template>
  <form>
      <input
        class="form-control mt-3"
        type="text"
        placeholder="First Name"
        v-model.trim="employee.first_name"
      >
      <input
        class="form-control mt-3"
        type="text"
        placeholder="Last Name"
        v-model.trim="employee.last_name"
      >
      <input
        class="form-control mt-3"
        type="text"
        placeholder="Position"
        v-model.trim="employee.position"
      >
      <div class="row d-flex justify-content-between mt-3">
        <label for="inputCoefficient" class="col-md-3 col-form-label">Coefficient</label>
        <div class="col-md-9">
          <input
            type="number"
            min="0"
            step="1"
            max="100"
            class="form-control"
            id="inputCoefficient"
            v-model.number="employee.coefficient"
          >
        </div>
      </div>
      <button
        :disabled="isDisabled"
        @click.prevent="create"
        class="btn btn-success mt-2 justify-self-end"
      >
        Create
      </button>
  </form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    create() {
      this.employee.coefficient = this.employee.coefficient / 100
      this.$emit('create', this.employee)
      this.employee = {first_name: '', last_name: '', coefficient: 0.5}
    },
  },
  data() {
    return {
      employee: {
        first_name: '',
        last_name: '',
        position: '',
        coefficient: 50,
      },
    }
  },
  computed: {
    isDisabled() {
      return this.employee.first_name.length === 0 || this.employee.last_name.length === 0 || this.employee.coefficient.length === 0
    }
  }
}
</script>