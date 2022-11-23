<template>
  <component :is="svgIcon" class="fill-current" />
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'

export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const svgIcon = computed(() => {
      console.log('svgIcon', svgIcon)
      if (props.icon === '') {
        return
      }
      let component
      try {
        console.log('props.icon', props.icon)
        component = defineAsyncComponent(() =>
          import(`@/components/icons/${props.icon}.vue`)
        )
        // component = () => import(`@/components/icons/${props.icon}.vue`)
      } catch (error) {
        console.log('Icon Error: ', error)
        component = ''
      }
      console.log('component', component)
      return component
    })
    return { svgIcon }
  },
}
</script>

<style></style>
