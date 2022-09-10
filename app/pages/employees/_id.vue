<template>
  <v-container>
    <v-row>
      <div class="col-lg-2 offset-lg-2">
        <v-sheet class="pa-2" rounded elevation="3">
          <div class="d-flex justify-space-between align-center">
            <div>
              {{this.fullName}}
            </div>
            <v-chip>
              {{this.employee.position}}
            </v-chip>
          </div>
          <div class="pt-2">
            <v-dialog v-model="dialogVisible" content-class="col-4 elevation-0">
              <template v-slot:activator="{ on, attrs }">
                <button-add :data="btnAddData" v-on="on" v-bind="attrs" />
              </template>
                <v-card>
                  <v-card-title>
                    Add Procedure
                  </v-card-title>
                  <v-card-text>
                    <MasterProcedureForm @create="createMasterProcedure" />
                  </v-card-text>
                </v-card>
            </v-dialog>
          </div>
        </v-sheet>
      </div>
      <div class="col-lg-5">
        <v-data-table
        :headers="headers"
        :items="procedures"
        item-key="id"
      >
        <template v-slot:[`header.actions`]="{ header }">
          <v-layout justify-end>
            {{ header.text }}
          </v-layout>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-layout justify-end>
            <v-icon @click="showEditDialog(item)">mdi-pencil</v-icon>
            <v-icon @click="showDeleteDialog(item)">mdi-delete</v-icon>
          </v-layout>
        </template>
        <template v-slot:[`item.coefficient`]="{ item }">
          <v-layout justify-center>
            {{ item.coefficient * 100 }}
          </v-layout>
        </template>
      </v-data-table>
      </div>
    </v-row>
    <v-dialog v-model="dialogDelete" content-class="elevation-0 col-lg-4" @click:outside="closeDelete">
      <v-card>
        <v-card-title class="text-h5 justify-center">Are you sure you want to delete <span>"<span class="text-capitalize">{{ deleteItem.procedure?.name }}</span>"</span>?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" content-class="elevation-0 col-lg-4" @click:outside="closeDelete">
      <v-card>
        <v-card-title>
          Edit Procedure
        </v-card-title>
        <v-card-text>
          <MasterProcedureForm @create="editMasterProcedure" :instance="editItem" :disableSelector="disableSelector" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      employee: {
        id: null,
        first_name: '',
        last_name: '',
        position: '',
      },
      btnAddData: {
        small: true
      },
      procedures: [],
      headers: [
        {text: '#', value: 'id'},
        {text: 'Name', value: 'procedure.name', align: 'center'},
        {text: 'Price', value: 'price', align: 'center'},
        {text: '%', value: 'coefficient', align: 'center'},
        {text: 'Actions', value: 'actions', sortable: false, align: 'end'}
      ],
      dialogVisible: false,
      dialogDelete: false,
      dialogEdit: false,
      disableSelector: {
        disabled: true
      },
      editItem: {},
      deleteItem: {}
    }
  },
  props: {
  },
  methods: {
    async fetchEmployee() {
      const response = await this.$axios.get(`/employees/${this.employeeID}/`)
      this.employee = response.data
    },
    async fetchProcedures() {
      const response = await this.$axios.get(`/master-procedures/`, {params: {employee: this.employeeID}})
      this.procedures = response.data
    },
    async createMasterProcedure(data) {
      data.employee = this.employeeID
      const response = await this.$axios.post(`/master-procedures/`, data)
      await this.refetchData()
      this.dialogVisible = false
    },
    async editMasterProcedure(procedure) {
      console.log('procedure', procedure)
      const {id , ...data} = procedure
      console.log('data', data)
      data.procedure = data.procedure.id !== null ? data.procedure.id : data.procedure
      data.employee = data.employee.id
      console.log(data)
      try {
        await this.$axios.put(`/master-procedures/${id}/`, data)
        await this.refetchData()
        this.closeEdit()
      } catch({response}) {
        console.log(response)
      }
    },
    async refetchData() {
      await this.fetchProcedures()
    },
    showDeleteDialog(item) {
      this.deleteItem = item
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      const id = this.deleteItem.id
      await this.$axios.delete(`/master-procedures/${id}/`)
      this.procedures = this.procedures.filter(p => p.id !== id)
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.deleteItem = {}
    },
    closeEdit() {
      this.editItem = {}
      this.dialogEdit = false
    },
    showEditDialog(item) {
      Object.assign(this.editItem, item)
      this.editItem.coefficient = this.editItem.coefficient * 100
      console.log(this.editItem)
      this.dialogEdit = true
    }
  },
  computed: {
    fullName() {
      return this.employee.first_name + ' ' + this.employee.last_name
    },
    employeeID() {
      return this.employee.id ? this.employee.id : this.$route.params.id
    }
  },
  async mounted() {
    await this.fetchEmployee()
    await this.fetchProcedures()
  }

}
</script>

<style scoped>
.center-card {
  height: 80vh;
}
</style>>