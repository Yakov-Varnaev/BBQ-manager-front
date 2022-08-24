<template>
  <div class="d-flex align-items-center row">
    <strong class="col-md-1 col-sm-2">{{ employee.id }}</strong>
    <div class="col-md-7 col-sm-4 text-center">
      {{ employee.first_name }} {{ employee.last_name }}
    </div>
    <div class="col-md-3 col-sm-4">
      {{ employee.coefficient }}
    </div>
    <div class="col-md-1 col-sm-2">
      <button class="btn text-danger" @click="$emit('remove', employee)">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data() {
    return {}
  },
  props: {
    employee: {
      type: Object,
      required: true,
    }
  },
  methods: {}
}
</script>
