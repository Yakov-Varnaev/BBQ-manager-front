<template>
  <div>
    <common-heading @updated="refetchData">
      <h2>Employee</h2>
      <v-dialog v-model="dialogVisible" content-class="col-4 elevation-0">
        <template v-slot:activator="{ on, attrs }">
          <button-add v-on="on" v-bind="attrs"/>
        </template>
          <v-card>
            <v-card-title>
              Add Employee
            </v-card-title>
            <v-card-text>
              <EmployeeForm @create="createEmployee"/>
            </v-card-text>
          </v-card>
      </v-dialog>
    </common-heading>
    <v-container class="col-lg-8">
      <v-data-table
        :headers="headers"
        :items="employees"
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
      <template v-slot:[`item.first_name`]="{ item }">
        <v-layout justify-center>
          {{ item.first_name }}
        </v-layout>
      </template>
      </v-data-table>

      <v-dialog v-model="dialogDelete" content-class="elevation-0 col-lg-4" @click:outside="closeDelete">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            Are you sure you want to delete <span>
              "<span class="text-capitalize red--text">{{deleteItem.first_name}} {{deleteItem.last_name}}</span>"?
            </span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogEdit" content-class="elevation-0 col-lg-4" @click:outside="closeEdit">
        <v-card>
          <v-card-title>Edit Employee</v-card-title>
          <v-card-text>
            <EmployeeForm :employeeInst="editEmployee" @create="submitEmployeeEdit"/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>

export default {
  methods: {
    hideDialog() {
      this.dialogVisible = false
    },
    hideEditDialog() {
      this.dialogEdit = false
      this.editEmployee = {}
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchEmployees() {
      const employees = await this.$axios.$get(`/objects/${this.currentObject.id}/employees/`)
      this.employees = employees
    },
    showDeleteDialog(empl) {
      this.deleteItem = empl
      this.dialogDelete = true
    },
    closeDelete() {
      this.deleteEmployee = {}
      this.dialogDelete = false
    },
    closeEdit() {
      this.editEmployee = {}
      this.dialogEdit = false
    },
    showEditDialog(empl) {
      console.log(empl)
      this.editEmployee = empl
      this.dialogEdit = true
    },
    submitEmployeeEdit(employee) {
      const {id, ...data} = employee
      const resp = this.$axios.$put(`/employees/${id}/`, data)
      this.hideEditDialog()
    },
    closeEdit() {
      this.editEmployee = {}
      this.dialogEdit = false
    },
    async createEmployee(data) {
      try {
        const response = await this.$axios.$post(`/objects/${this.currentObject.id}/employees/`, data)
        this.employees.push(response)
        this.dialogVisible = false
      } catch (e) {
        console.log(e)
      }
    },
    async deleteItemConfirm() {
      try {
        await this.$axios.$delete(`/employees/${this.deleteItem.id}/`)
        this.employees = this.employees.filter(empl => empl.id !== this.deleteItem.id)
        this.deleteItem = {}
        this.dialogDelete = false
      } catch ({response}) {
        console.log(response)
      }
    },
    async refetchData() {
      console.log('here')
      await this.fetchEmployees()
    },
    openEmployee(employee) {
      this.$router.push(`/employees/${employee.id}`)
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogDelete: false,
      dialogEdit: false,
      deleteItem: {},
      employees: [],
      headers: [
        {text: '#', value: 'id'},
        {text: 'First Name', value: 'first_name', align: 'center'},
        {text: 'Last Name', value: 'last_name', align: 'center'},
        {text: 'Position', value: 'position', align: 'center'},
        {text: 'Actions', value: 'actions', sortable: false, align: 'center'}
      ],
      editEmployee: {}
    };
  },
  mounted() {
    this.fetchEmployees()
  },
  computed: {
    currentObject() {
      return this.$store.getters.getCurrentObject
    }
  },
  watch: {
    currentObject() {
      this.fetchEmployees()
    }
  }
}
</script>

<style>
.v-data-table-header th {
  white-space: nowrap;
}
</style>