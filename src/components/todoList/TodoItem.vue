<template>
  <div class="border border-gray-300 px-7 py-3 hover:cursor-move">
    {{ item.todo }}
  </div>
</template>

<script>
export default {
  props: ['item'],
}
</script>
