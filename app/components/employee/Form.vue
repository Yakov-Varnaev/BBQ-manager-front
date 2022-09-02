<template>
  <form>
    <v-text-field
      label="First Name"
      v-model.trim="employee.first_name"
    ></v-text-field>
    <v-text-field
      label="Last Name"
      v-model.trim="employee.last_name"
    ></v-text-field>
    <v-text-field
      label="Position"
      v-model.trim="employee.position"
    ></v-text-field>
    <button-save @click.prevent="createEmployee"/>
  </form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    createEmployee() {
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
      },
    }
  },
  computed: {
    isDisabled() {
      return (
        this.employee.first_name.length === 0 ||
        this.employee.last_name.length === 0 ||
        this.employee.position.length === 0
      )
    }
  }
}
</script>