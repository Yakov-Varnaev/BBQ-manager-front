<template>
  <form>
    <v-text-field
      label="First Name"
      v-model.trim="employeeInst.first_name"
    ></v-text-field>
    <v-text-field
      label="Last Name"
      v-model.trim="employeeInst.last_name"
    ></v-text-field>
    <v-text-field
      label="Position"
      v-model.trim="employeeInst.position"
    ></v-text-field>
    <button-save @click.prevent="createEmployee"/>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    employeeInst: {
      type: Object,
      required: false,
      default: () => {
        return {
          first_name: '',
          last_name: '',
          position: '',
        }
      }
    }
  },
  methods: {
    createEmployee() {
      this.$emit('create', this.employeeInst)
    }
  },
  // data() {
  //   return {
  //     employee: {...this.employeeInst}
  //   }
  // },
  computed: {
    isDisabled() {
      return (
        this.employee.first_name.length === 0 ||
        this.employee.last_name.length === 0 ||
        this.employee.position.length === 0
      )
    },
  }
}
</script>