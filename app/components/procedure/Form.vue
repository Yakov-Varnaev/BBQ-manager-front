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
    <button-save @click="createProcedure" :disabled="isButtonDisabled"/>
  </v-form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    procedure: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: '',
          department: null
        }
      }
    }
  },
  methods: {
    createProcedure() {
      this.$emit('create', this.procedure)
    },
  },
  data() {
    return {
    }
  },
  computed: {
    departments() {
      return this.$store.getters.getObjectDepartments
    },
    isButtonDisabled() {
      return this.procedure.name?.length === 0 || this.procedure.department === null
    }
  },
}
</script>