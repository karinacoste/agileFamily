<template>
  <div class="w-96 py-5 px-10 my-10 mx-6 border border-gray-300">
    <div class="font-semibold text-xl mb-4 pb-3 border-b border-gray-300">
      {{ title }}
    </div>

    <slot name="item"></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
}
</script>
