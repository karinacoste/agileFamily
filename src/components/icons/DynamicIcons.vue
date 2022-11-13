<template>
  <component :is="svgIcon" class="fill-current" />
</template>

<script>
import { computed, ref } from 'vue'
export default {
  components: {
    svgIcon,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const svgIcon = ref(() => import(`@/components/icons/OptionsIcon.vue`))
    // const svgIcon = computed(() => {
    //   console.log('svgIcon', svgIcon)
    //   if (props.icon === '') {
    //     return
    //   }
    //   let component
    //   try {
    //     component = () => import(`@/components/icons/OptionsIcon.vue`)
    //   } catch (error) {
    //     console.log('Icon Error: ', error)
    //     component = ''
    //   }
    //   return component
    // })
    return { svgIcon }
  },
}
</script>

<style></style>
