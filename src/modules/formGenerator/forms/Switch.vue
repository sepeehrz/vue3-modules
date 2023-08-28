<template>
  <div class="Lr--form__switch">
    <label>{{ model === true ? 'فعال' : 'غیرفعال' }}</label>
    <FormSwitch v-model="model" :disabled="field.disabled" />
  </div>
</template>
<script lang="ts" setup>
  import {useModel} from '../../forms/controller/model';
  import {IField} from '../types/dataTypes';

  interface Props {
    modelValue: boolean;
    field: IField;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: false
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: boolean): void;
    (e: 'input'): void;
  }>();

  const {model} = useModel(props, emits);
</script>
<style lang="scss" scoped>
  .Lr--form__switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 16px;
    background-color: #ecf3ff;
    border-radius: 4px;

    label {
      font-size: 20px;
      font-weight: 400;
      color: #6c757d;
    }
  }
</style>
