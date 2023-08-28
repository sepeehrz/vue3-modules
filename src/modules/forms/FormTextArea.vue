<template>
  <div class="Lr--text__area" :class="{disabled: disabled}">
    <label v-if="label" class="Lr--label">{{ label }}</label>
    <textarea
      v-model="model"
      type="text"
      class="Lr--input"
      :placeholder="placeholder"
      :name="name" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormTextArea'
  });
</script>

<script lang="ts" setup>
  import {useModel} from './controller/model';
  import {IValidation} from '@dashboard/utils';

  interface Props {
    modelValue: any;
    placeholder?: string;
    name?: string;
    validation?: IValidation[] | undefined;
    label?: string;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: ''
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const {model} = useModel(props, emits);
</script>
<style lang="scss" scoped>
  .Lr--text__area {
    position: relative;

    &.disabled {
      .Lr--input {
        pointer-events: none;
        background-color: #e9ecef;
        border: 1px solid #e9ecef;
      }

      .Lr--label {
        background-color: inherit;
      }
    }

    .Lr--input {
      border: 1px solid #212529;
      border-radius: 4px;
      padding: 7px;
      width: 100%;
      color: #212529;
      font-size: 14px;
      resize: none;

      &:focus {
        outline: 1px solid #0d6efd;
      }

      &.error {
        border: 1px solid red;

        &:focus {
          outline: none;
        }
      }

      &::placeholder {
        color: #575353;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }
    }

    .Lr--label {
      position: absolute;
      top: -10px;
      right: 10px;
      background-color: #fff;
      padding: 0 10px;
      color: #212529;
    }
  }
</style>
