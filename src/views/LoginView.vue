<template>
  <div class="h-screen relative justify-center items-center flex">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  components: {
    LoginForm,
  },
}
</script>
