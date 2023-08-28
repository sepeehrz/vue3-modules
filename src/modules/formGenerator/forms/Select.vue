<template>
  <div class="Lr--form__item">
    <FormSelect
      v-model="model"
      :items="field.items"
      :placeholder="field.placeholder"
      :label="field.label"
      :disabled="field.disabled" />
  </div>
</template>

<script lang="ts" setup>
  import {useModel} from '../../forms/controller/model';
  import {IField} from '../types/dataTypes';

  interface Props {
    modelValue: string;
    field: IField;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: ''
  });
  const emits = defineEmits<{
    (e: 'update:modelValue', id: number): void;
  }>();

  const {model} = useModel(props, emits);
</script>

<style lang="scss" scoped>
  ::v-deep {
    .Lr--select__wrapper {
      width: 100%;
    }
  }
</style>
