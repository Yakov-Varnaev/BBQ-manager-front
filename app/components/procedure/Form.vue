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
        class="btn text-success mt-2 justify-self-end"
      >
        <i class="bi bi-check-lg"></i> Save
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