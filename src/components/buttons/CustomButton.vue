<template>
  <div>
    <button :class="buttonClass" @click="onClick">
      <DynamicIcons :icon="icon" :class="iconClass" />
      {{ text }}
    </button>
  </div>
</template>

<script>
import DynamicIcons from '@/components/icons/DynamicIcons.vue'
export default {
  components: {
    DynamicIcons,
  },
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
    icon: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: 'w-4 mr-2',
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
