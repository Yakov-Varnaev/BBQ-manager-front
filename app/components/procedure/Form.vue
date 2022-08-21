<template>
  <form>
    <h4>Create Procedure</h4>
    <input
      type="text"
      placeholder="Name"
      v-model.trim="procedure.name"
    >
    <button @click.prevent="createProcedure">Create</button>
  </form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    createProcedure() {
      this.procedure.id = Date.now()
      this.$emit('create', this.procedure)
      this.procedure = {name: ''}
    },
  },
  data() {
    return {
      procedure: {
        name: ''
      }
    }
  },
}
</script>

<style>

</style>