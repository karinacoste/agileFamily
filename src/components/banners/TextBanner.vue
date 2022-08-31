<template>
  <div class="w-full bg-blue-banner h-96 flex items-center justify-center">
    <div class="w-5/6 flex">
      <div class="text-4xl w-full md:w-1/2 text-white">
        <div class="w-full md:w-4/6 ml-auto text-center md:text-right">
          ¡Organiza y gestiona los proyectos y tareas de tu familia!
        </div>
      </div>
      <div class="hidden md:w-1/2"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: '',
    },
    bannerTest: {
      tipe: String,
      default: '',
    },
  },
}
</script>
