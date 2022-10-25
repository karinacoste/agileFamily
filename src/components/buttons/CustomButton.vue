<template>
  <div>
    <button :class="buttonClass" @click="onClick">{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Guardar',
    },
    buttonClass: {
      type: String,
      default:
        'h-full ml-auto px-12 py-3 flex items-center justify-center rounded-md bg-primary hover:bg-primaryDark text-white focus:outline-none',
    },
  },
  setup(props, context) {
    const onClick = () => context.emit('onEvent')
    return {
      onClick,
    }
  },
}
</script>

<style></style>
