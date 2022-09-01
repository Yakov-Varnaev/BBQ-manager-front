<template>
  <v-btn class="success" v-on="$listeners">
    <slot>
      <v-icon small class="pr-1">mdi-check</v-icon> Save
    </slot>
  </v-btn>
</template>

<script>
export default {
  name: 'Save'
}
</script>