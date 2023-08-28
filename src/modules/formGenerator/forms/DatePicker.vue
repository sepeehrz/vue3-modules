<template>
  <div class="Lr--form__item">
    <FormDatePicker
      v-model="model"
      :label="field.label"
      :placeholder="field.placeholder"
      :disabled="field.disabled" />
  </div>
</template>
<script lang="ts" setup>
  import {useModel} from '../../forms/controller/model';
  import {IField} from '../types/dataTypes';

  interface Props {
    modelValue: string | null | undefined;
    field: IField;
  }
  const props = defineProps<Props>();

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const {model} = useModel(props, emits);
</script>
<style lang="scss" scoped></style>
