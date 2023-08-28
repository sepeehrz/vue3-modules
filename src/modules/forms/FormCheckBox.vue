<template>
  <div class="Lr--checkbox">
    <input v-model="model" type="checkbox" :id="id" :disabled="disabled" />
    <label :for="id" class="Lr--label" v-if="label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormCheckBox'
  });
</script>
<script lang="ts" setup>
  import {useModel} from './controller/model';
  import {computed} from 'vue';
  interface Props {
    modelValue: any;
    label?: string;
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const {model} = useModel(props, emits);
  const id = computed(() => {
    return `checkbox_${Math.random() * 100}`;
  });
</script>

<style lang="scss" scoped>
  .Lr--checkbox {
    display: flex;
    align-items: center;

    .Lr--label {
      margin-right: 5px;
      color: #495057;
      font-size: 14px;
      font-weight: 500;
    }
  }
</style>
