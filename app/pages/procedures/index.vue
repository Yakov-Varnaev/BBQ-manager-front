<template>
  <div>
    <button @click="showDialog">
      Add
    </button>
    <Dialog :show="dialogVisible" @hide="hideDialog">
      <ProcedureForm :createProcedure="createProcedure" @create="createProcedure"/>
    </Dialog>
    <ProcedureTable :procedures="procedures" />
  </div>
</template>

<script>
import Dialog from '../../components/Dialog.vue';
export default {
  components: { Dialog },
  props: {
      name: "",
  },
  methods: {
    createProcedure(procedure) {
      this.procedures.push(procedure)
      this.dialogVisible = false
    },
    hideDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      console.log('Show Dialog')
      this.dialogVisible = true
    },
    async fetchProcedures() {
      const procedures = await this.$axios.$get('/procedures/')
      console.log(procedures)
      this.procedures = procedures
    },
    async createProcedure(data) {
      const procedure = await this.$axios.$post('/procedures/', data)
      this.procedures.push(procedure)
    },
  },
  data() {
    return {
      dialogVisible: false,
        procedures: []
    };
  },
  mounted() {
    this.fetchProcedures()
  }
}
</script>
