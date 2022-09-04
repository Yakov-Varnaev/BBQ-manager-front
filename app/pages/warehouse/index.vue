<template>
  <div class="container">
    <common-heading>
      <h2>Warehouse</h2>
      <v-dialog v-model="dialogVisible" content-class="col-4 elevation-0">
        <template v-slot:activator="{ on, attrs }">
          <button-add v-on="on" v-bind="attrs"/>
        </template>
          <v-card>
            <v-card-title>
              Add Supply
            </v-card-title>
            <v-card-text>
              add supply here
            </v-card-text>
          </v-card>
      </v-dialog>
    </common-heading>
    <v-container class="col-lg-8">
      <v-data-table
        :headers="headers"
        :items="materials"
      >
        <template v-slot:[`header.actions`]="{ header }">
          <v-layout justify-end>
            {{ header.text }}
          </v-layout>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-layout justify-end>
            <v-icon>mdi-pencil</v-icon>
            <v-icon @click="showDeleteDialog(item)">mdi-delete</v-icon>
          </v-layout>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      materialDialog: false,
      page: 'names',
      materials: [],
      headers: [
        {text: '#', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Amount', value: 'amount'},
        {text: 'Unit', value: 'unit'},
        {text: 'Actions', value: 'actions', sortable: false, align: 'end'}
      ]
    }
  },
  methods: {
    async fetchMaterials() {
      console.log('fetch materials')
      const resp = await this.$axios.get(`/objects/${this.currentObject.id}/stocks/remain/`)
      console.log('current remain', resp.data)
      this.materials = resp.data
    }
  },
  mounted() {
    this.fetchMaterials()
  },
  computed: {
    currentObject() {
      return this.$store.getters.getCurrentObject
    }
  },
  watch: {
    currentObject() {
      this.fetchMaterials()
    }
  }
}
</script>

<style>

</style>