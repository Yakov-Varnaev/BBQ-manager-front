<template>
  <div>
    <div class="container">
      <div class="col-lg-8 offset-lg-2 d-flex justify-content-between align-items-center mt-3">
        <h2>Employees</h2>
        <button @click="showDialog" class="btn btn-success">
          Add
        </button>
      </div>
      <Dialog :show="dialogVisible" @hide="hideDialog">
        <div class="m-3">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="m-0 p-0">Add Employee</h4>
            <button class="btn btn-xs text-danger" @click="hideDialog">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <EmployeeForm @create="createEmployee" class="mt-2" />
        </div>
      </Dialog>
      <CommonTable class="mt-2 col-lg-8 offset-lg-2">
        <li class="list-group-item" v-for="empl in employees" :key="empl.id">
          <employee-item :employee="empl" @remove="deleteEmployee" />
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
    hideDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchEmployees() {
      const employees = await this.$axios.$get('/employees/')
      this.employees = employees
    },
    async createEmployee(data) {
      try {
        const response = await this.$axios.$post('/employees/', data)
        this.employees.push(response)
        this.dialogVisible = false
      } catch ({response}) {
        console.log(response)
      }
    },
    async deleteEmployee(employee) {
      try {
        await this.$axios.$delete(`/employees/${employee.id}/`)
        this.employees = this.employees.filter(empl => empl.id !== employee.id)
      } catch ({response}) {
        console.log(response)
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
      employees: []
    };
  },
  mounted() {
    this.fetchEmployees()
  }
}
</script>
