<template>
  <div>
    <label :class="labelClass">{{ inputLabel }}</label>
    <input
      :type="inputType"
      :class="inputClass"
      v-model="newValue"
      @input="this.$emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      newValue: this.inputValue,
    }
  },
  props: {
    inputLabel: {
      type: String,
      default: 'Label',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputValue: {
      type: String,
      default: 'sss',
    },
    inputName: {
      type: String,
      default: 'text',
    },
    onInput: {
      type: String,
      default: 'text',
    },
    labelClass: {
      type: String,
      default: 'ml-1',
    },
    inputClass: {
      type: String,
      default:
        'border w-full p-2 bg-white border-gray-600 text-gray-500 outline-none rounded-md mb-4',
    },
  },
}
</script>
