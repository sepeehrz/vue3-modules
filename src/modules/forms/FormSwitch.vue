<template>
  <label class="Lr--switch__toggle">
    <input
      v-model="model"
      class="Lr--switch__button"
      type="checkbox"
      :disabled="disabled" />
    <span
      class="Lr--slide__toggle"
      :style="{
        backgroundColor: model === undefined ? '#DC3545' : '#198754'
      }"></span>
  </label>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormSwitch'
  });
</script>
<script lang="ts" setup>
  import {useModel} from './controller/model';

  interface Props {
    modelValue: boolean;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: boolean): void;
  }>();

  const {model} = useModel(props, emits);
</script>

<style lang="scss" scoped>
  .Lr--switch__toggle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 34px;

    .Lr--switch__button {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked {
        + .Lr--slide__toggle {
          background-color: #2196f3;

          &::before {
            -webkit-transform: translateX(15px);
            -ms-transform: translateX(15px);
            transform: translateX(15px);
          }
        }
      }

      &:focus {
        + .Lr--slide__toggle {
          box-shadow: 0 0 1px #2196f3;
        }
      }
    }

    .Lr--slide__toggle {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 10px;

      &::before {
        position: absolute;
        content: '';
        height: 15px;
        width: 15px;
        left: 6px;
        border-radius: 6px;
        bottom: 9px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
    }
  }
</style>
