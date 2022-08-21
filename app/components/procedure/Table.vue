<template>
  <div>  
    <div v-for="p in procedures" class="procedure-item" :key="p.id">
      {{p.id}} {{p.name}}
    </div>
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