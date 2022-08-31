<template>
  <div class="w-full bg-blue-banner flex items-center justify-center">
    <div class="w-5/6 flex my-16 sm:my-0 md:my-10 lg:my-0 md:flex-row flex-col">
      <div
        class="flex md:flex-row flex-col text-4xl w-full md:w-1/2 text-white items-center"
      >
        <div class="w-full md:w-4/6 ml-auto text-center md:text-right md:mr-32">
          ¡Organiza y gestiona los proyectos y tareas de tu familia!
        </div>
      </div>
      <div class="flex w-full md:w-1/2">
        <div class="md:w-full">
          <img
            src="../../assets/images/familyImage.png"
            alt="agileFamily Logo"
          />
        </div>
      </div>
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
