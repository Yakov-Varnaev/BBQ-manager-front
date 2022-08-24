<template>
  <div>
    <div class="container">
      <div class="col-lg-8 offset-lg-2 d-flex justify-content-between align-items-center mt-3">
        <h2>Procedures</h2>
        <button @click="showDialog" class="btn btn-success">
          Add
        </button>
      </div>
      <Dialog :show="dialogVisible" @hide="hideDialog">
        <div class="m-3">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="m-0 p-0">Create</h4>
            <button class="btn btn-xs text-danger" @click="hideDialog">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <ProcedureForm :createProcedure="createProcedure" @create="createProcedure" class="mt-2" />
        </div>
      </Dialog>
      <CommonTable :procedures="procedures" class="mt-2 col-lg-8 offset-lg-2">
        <li class="list-group-item" v-for="procedure in procedures" :procedure="procedure" :key="procedure.id">
          <procedure-item :procedure="procedure" @remove="deleteProcedure" />
        </li>
      </CommonTable>
    </div>
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
      this.dialogVisible = false
    },
    async deleteProcedure(procedure) {
      try {
        const response = await this.$axios.$delete(`/procedures/${procedure.id}/`)
        this.procedures = this.procedures.filter(p => p.id !== procedure.id)
      } catch ({response}) {
        console.log(response)
      }
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
