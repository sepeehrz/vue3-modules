<template>
  <div class="Lr--form__item">
    <FormAutoComplete
      v-model="model"
      :items="field.items"
      :label="field.label"
      :placeholder="field.placeholder"
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
    (e: 'update:modelValue', items: number): void;
  }>();

  const {model} = useModel(props, emits);
</script>

<style lang="scss" scoped></style>
