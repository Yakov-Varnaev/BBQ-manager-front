<template>
  <form>
      <input
        class="form-control"
        type="text"
        placeholder="Procedure Name"
        v-model.trim="procedure.name"
      >
      <button
        :disabled="!procedure.name.length"
        @click.prevent="createProcedure"
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
    createProcedure() {
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