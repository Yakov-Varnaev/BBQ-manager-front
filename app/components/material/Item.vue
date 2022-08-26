<template>
  <div
    class="list-group-item list-group-item-action"
    :key="material.id"
    @click="openMaterial(material)"
  >
    <div class="d-flex align-items-center row text-center">
      <strong class="col-1">{{ material.id }}</strong>
      <div class="col-4 text-capitalize">
        {{ material.name }}
      </div>
      <div class="col-3">
        {{ material.unit }}
      </div>
      <div class="col-3">
        {{ material.price }}
      </div>
      <div class="col-1">
        <button class="btn text-danger" @click.stop.prevent="$emit('remove', material)">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  methods: {
    openMaterial(material) {
      console.log('open', material)
    },
  }
}
</script>

<style>

</style>