<template>
  <v-form>
    <v-select
      v-bind="disableSelector"
      :items="procedures"
      label="Select Procedure"
      v-model="instance.procedure"
      item-text="name"
      item-value="id"
    >
    </v-select>
    <v-slider
      label="Coefficient"
      max="100"
      v-model="instance.coefficient"
      hint="Coefficient"
      thumb-label="always"
      class="pt-7"
    ></v-slider>
    <v-text-field
      label="Price"
      v-model="instance.price"
      type="number"
    />
    <button-save @click="createProcedure" :disabled="isButtonDisabled"/>
  </v-form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    instance: {
      type: Object,
      required: false,
      default: () => {
        return {
          procedure: '',
          price: '1100',
          coefficient: 50
        }
      }
    },
    disableSelector: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    createProcedure() {
      this.instance.coefficient = this.instance.coefficient / 100
      this.$emit('create', this.instance)
    },
    async fetchProcedures() {
      const procedures = await this.$axios.$get(`/procedures/`, {params: {object: this.currentObject.id}})
      this.procedures = procedures
    },
  },
  data() {
    return {
      procedures: []
    }
  },
  computed: {
    isButtonDisabled() {
      return false
    },
    currentObject() {
      return this.$store.getters.getCurrentObject
    },
  },
  async mounted() {
    await this.fetchProcedures()
  }
}
</script>