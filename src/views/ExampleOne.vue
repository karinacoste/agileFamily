<template>
  <div class="h-screen relative justify-center items-center flex">
    <h1>Sign Up</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  name: 'ExampleOne',

  components: {
    LoginForm,
  },
}
</script>
