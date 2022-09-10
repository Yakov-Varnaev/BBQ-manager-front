<template>
  <v-btn class="success" v-on="$listeners" v-bind="data">
    <slot>
      <v-icon small class="pr-1">mdi-plus-circle-outline</v-icon> Add
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'Add',
  props: {
    data: {
      type: Object,
      requred: false,
      default: () => {}
    }
  }
}
</script>

<style>

</style>