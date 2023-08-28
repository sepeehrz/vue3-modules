<template>
  <input
    v-model="model"
    type="radio"
    name="radiobutton"
    id="radiobutton"
    :value="modelValue"
    class="Lr--radio__input" />
  <label for="radiobutton" v-if="label" class="Lr--radio__title">
    {{ label }}
  </label>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormRadioButton'
  });
</script>
<script lang="ts" setup>
  import {useModel} from './controller/model';

  interface Props {
    modelValue: boolean;
    label?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: false
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: boolean): void;
  }>();

  const {model} = useModel(props, emits);
</script>

<style lang="scss" scoped>
  .Lr--radio__title {
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1.1;
  }

  .Lr--radio__input {
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      // box-shadow: inset 1em 1em blue;
      background-color: red;
    }

    &:checked {
      &::before {
        transform: scale(1);
      }
    }

    &:focus {
      outline: max(2px, 0.15em) solid green;
      outline-offset: max(2px, 0.15em);
    }
  }
</style>
