<template>
  <transition name="fade">
    <div class="dialog" v-if="show" @click="$emit('hide')">
      <div class="dialog__content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
  mounted() {

  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  z-index: 1;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 5px;
  width: 50%;
  min-height: 100px;
  min-width: 300px;
  max-width: 400px;
}
</style>