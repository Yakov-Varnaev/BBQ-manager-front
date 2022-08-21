<template>
  <div>  
    <procedure-item v-for="procedure in procedures" :procedure="procedure" :key="procedure.id" />
  </div>
</template>

<script>
export default {
  props: {
    procedures: {
      type: Array,
      required: true,
    }
  },
  name: 'Table'
}
</script>

<style>

</style>