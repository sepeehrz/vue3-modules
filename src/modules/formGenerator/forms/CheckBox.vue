<template>
  <FormCheckBox
    v-model="model"
    :label="field.label"
    :disabled="field.disabled" />
</template>

<script lang="ts" setup>
  import {useModel} from '../../forms/controller/model';
  import {IField} from '../types/dataTypes';
  interface Props {
    modelValue: any;
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
