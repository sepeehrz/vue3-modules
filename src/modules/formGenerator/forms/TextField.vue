<template>
  <FormTextField
    v-model="model"
    :placeholder="field.placeholder"
    :name="field.name"
    :label="field.label"
    :validation="field.validation"
    :hint="field.hint"
    :disabled="field.disabled"
    :typeInput="field.typeInput" />
</template>

<script lang="ts" setup>
  import {useModel} from '../../forms/controller/model';
  import {IField} from '../types/dataTypes';
  interface Props {
    modelValue: string | number | null;
    field: IField;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: ''
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const {model} = useModel(props, emits);
</script>
