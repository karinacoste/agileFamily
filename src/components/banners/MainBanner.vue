<template>
  <div
    class="w-full flex items-center justify-center"
    :class="{ 'bg-blue-banner': backgroundImage }"
  >
    <div
      class="w-5/6 flex mt-16 mb-10 sm:my-10 lg:my-0 md:flex-row flex-col bg-red"
    >
      <div class="flex md:flex-row flex-col w-full md:w-1/2 items-center">
        <div class="w-full md:w-4/6 ml-auto md:mr-32">
          <div
            class="flex md:text-right text-white md:text-3xl text-2xl text-center"
          >
            {{ text }}
          </div>
          <div
            class="mt-6 w-full flex md:justify-end md:items-end justify-center items-center"
          >
            <button
              v-if="withButton"
              @click="goTo"
              class="px-14 py-2 bg-white rounded-lg text-primary md:text-lg text-base leading-snug font-semibold opacity-95 hover:opacity-100"
            >
              Comenzar ahora
            </button>
          </div>
        </div>
      </div>
      <div class="flex w-full md:w-1/2">
        <div class="md:w-full">
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
      default: 'familyImage',
    },
    bannerText: {
      tipe: String,
      default: '',
    },
    bannerButtonGoTo: {
      type: String,
      default: 'SignupView',
    },
    backgroundImage: {
      type: Boolean,
      default: false,
    },
    withButton: {
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
