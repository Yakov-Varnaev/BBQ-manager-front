<template>
  <v-form>
    <v-text-field
      label="Procedure Name"
      v-model.trim="procedure.name"
    >
    </v-text-field>
    <v-select
      :items="departments"
      label="Select Department"
      v-model="procedure.department"
      item-text="name"
      item-value="id"
    >
    </v-select>
    <button-save @click="createProcedure"/>
  </v-form>
</template>

<script>
export default {
  name: 'Form',
  methods: {
    createProcedure() {
      this.$emit('create', this.procedure)
      this.procedure = {
        name: '',
        department: null
      }
    },
  },
  data() {
    return {
      procedure: {
        name: '',
        department: null
      }
    }
  },
  computed: {
    departments() {
      return this.$store.getters.getObjectDepartments
    }
  },
}
</script>