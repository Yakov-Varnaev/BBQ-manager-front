<template>
  <div>
    <common-heading>
      <h2>Procedures</h2>
      <v-dialog v-model="dialogVisible" content-class="col-4 elevation-0">
        <template v-slot:activator="{ on, attrs }">
          <button-add v-on="on" v-bind="attrs"/>
        </template>
          <v-card>
            <v-card-title>
              Add Procedure
            </v-card-title>
            <v-card-text>
              <ProcedureForm @create="createProcedure"/>
            </v-card-text>
          </v-card>
      </v-dialog>
    </common-heading>
    <v-container class="col-lg-8">
      <v-data-table
        dense
        :headers="headers"
        :items="procedures"
        item-key="id"
      >
      <template v-slot:[`header.actions`]="{ header }">
        <v-layout justify-end>
          {{ header.text }}
        </v-layout>
      </template>
      <template v-slot:[`header.name`]="{ header }">
        <v-layout justify-center>
          {{ header.text }}
        </v-layout>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-layout justify-end>
          <v-icon>mdi-pencil</v-icon>
          <v-icon @click="showDeleteDialog(item)">mdi-delete</v-icon>
        </v-layout>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-layout justify-center>
          <div class="text-capitalize">{{ item.name }}</div>
        </v-layout>
      </template>
      </v-data-table>

      <v-dialog v-model="dialogDelete" content-class="elevation-0 col-lg-4" @click:outside="closeDelete">
        <v-card>
          <v-card-title class="text-h5 justify-center">Are you sure you want to delete "<span class="text-capitalize">{{ deleteItem.name }}</span>"?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
      name: "",
  },
  data() {
    return {
      dialogVisible: false,
      dialogDelete: false,
      procedures: [],
      departments: [],
      deleteItem: {},
      headers: [
        {text: '#', value: 'id'},
        {text: 'Name', value: 'name', align: 'center'},
        {text: 'Actions', value: 'actions', sortable: false, align: 'end'}
      ]
    };
  },
  methods: {
    hideDialog() {
      this.dialogVisible = false
    },
    showDialog() {
      console.log('Show Dialog')
      this.dialogVisible = true
    },
    async fetchProcedures() {
      const procedures = await this.$axios.$get(`/procedures/`)
      this.procedures = procedures
    },
    async createProcedure(data) {
      try {
        const procedure = await this.$axios.$post('/procedures/', data)
        this.procedures.push(procedure)
        this.dialogVisible = false
        this.dialog = false
      } catch ({response}) {
        console.log(response)
      }
    },
    showDeleteDialog(procedure) {
      Object.assign(this.deleteItem, procedure)
      this.dialogDelete = true
      console.log('delete shown')
    },
    closeDelete() {
      this.dialogDelete = false
      this.deleteItem = {}
    },
    async deleteItemConfirm() {
      try {
        const response = await this.$axios.$delete(`/procedures/${this.deleteItem.id}/`)
        this.procedures = this.procedures.filter(p => p.id !== this.deleteItem.id)
        this.dialogDelete = false
        this.deleteItem = {}
      } catch ({response}) {
        console.log(response)
      }
    },
  },
  mounted() {
    this.fetchProcedures()
  }
}
</script>
