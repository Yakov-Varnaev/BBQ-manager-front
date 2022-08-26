<template>
  <div class="d-flex align-items-center d-flex row">
    <strong class="col-md-1">{{ procedure.id }}</strong>
    <div class="col-md-10 text-center">
      {{ procedure.name }}
    </div>
    <div class="col-md-1">
      <button class="btn text-danger" @click.stop.prevent="$emit('remove', procedure)">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
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
  },
  methods: {}
}
</script>

<style>

</style>