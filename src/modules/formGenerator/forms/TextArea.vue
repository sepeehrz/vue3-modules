<template>
  <FormTextArea
    v-model="model"
    :placeholder="field.placeholder"
    :label="field.label"
    :name="field.name"
    :validation="field.validation"
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
<style lang="scss" scoped></style>
