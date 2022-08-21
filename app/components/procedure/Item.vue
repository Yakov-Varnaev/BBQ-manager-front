<template>
  <div class="procedure-row-item">
    <strong>{{procedure.id}}</strong> {{procedure.name}}
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {
      
    }
  },
  props: {
    procedure: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style>

</style>