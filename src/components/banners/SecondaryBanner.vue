<template>
  <div
    class="w-full flex items-center justify-center md:py-32 py-4"
    :class="{ 'bg-gray-100': backgroundGray }"
  >
    <div
      class="md:w-4/6 w-full px-4 md:px-0 flex my-8 sm:my-10 md:my-0 md:flex-row flex-col"
    >
      <div
        class="flex md:flex-row flex-col w-full md:w-1/2 items-center justify-center"
        :class="{ 'md:order-last': textOnRight }"
      >
        <div class="w-96 flex flex-col">
          <h1
            class="md:text-left w-full text-center md:text-2xl text-xl font-semibold"
          >
            {{ bannerTextTitle }}
          </h1>
          <p class="md:text-left w-full text-center md:text-2xl text-lg">
            {{ text }}
          </p>
        </div>
      </div>
      <div class="flex w-full md:w-1/2">
        <div class="w-full mt-4">
          <img :src="image" alt="agileFamily Logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
export default {
  props: {
    bannerImage: {
      type: String,
      default: '',
    },
    bannerText: {
      tipe: String,
      default: '',
    },
    bannerTextTitle: {
      tipe: String,
      default: '',
    },
    backgroundGray: {
      type: Boolean,
      default: false,
    },
    textOnRight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter()
    const text = ref(props.bannerText)
    const image = computed(() =>
      require('@/assets/images/banners/' + props.bannerImage + '.png')
    )
    function goTo() {
      router.push('/' + props.bannerButtonGoTo)
    }
    return {
      text,
      image,
      goTo,
    }
  },
}
</script>
