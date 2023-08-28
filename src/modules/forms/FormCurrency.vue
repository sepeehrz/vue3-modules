<template>
  <div class="Lr--currency__field">
    <label v-if="label" class="Lr--label">
      {{ label }}
    </label>
    <input
      class="Lr--currency__input"
      :modelValue="model"
      :value="displayValue"
      @keypress="onKeyPress"
      @input="onChange"
      @change="emitValue" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormCurrency'
  });
</script>
<script lang="ts" setup>
  import {ref, watch} from 'vue';
  import {useModel} from './controller/model';

  interface Props {
    modelValue: any;
    label?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: ''
  });
  const emits = defineEmits<{
    (e: 'update:modelValue', items: string | number): void;
  }>();

  const {model} = useModel(props, emits);
  const displayValue = ref(props.modelValue);
  watch(
    () => props.modelValue,
    value => {
      if (value) {
        displayValue.value = Number.parseFloat(value)
          .toFixed(value.toString().includes('.') ? 2 : 0)
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      }
    }
  );
  function onKeyPress(e: any) {
    let numberArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      '.',
      '۰',
      '۱',
      '۲',
      '۳',
      '۴',
      '۵',
      '۶',
      '۷',
      '۸',
      '۹'
    ];
    if (!numberArray.some(item => item == e.key)) {
      e.preventDefault();
    }
  }
  function onChange(val: any) {
    displayValue.value = val.target.value
      .replace(/[۰-۹]/g, function (w: any) {
        return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'].indexOf(w);
      })
      .replace(/,/g, '')
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
  }
  function emitValue() {
    let newValue = parseFloat(displayValue.value.replace(/[^\d.]/g, ''));
    emits('update:modelValue', newValue);
  }
</script>
<style lang="scss" scoped>
  .Lr--currency__field {
    position: relative;
    .Lr--label {
      position: absolute;
      top: -10px;
      right: 10px;
      background-color: #fff;
      padding: 0 10px;
      color: #212529;
    }
    .Lr--currency__input {
      border: 1px solid #212529;
      border-radius: 4px;
      padding: 16px;
      width: 100%;
      color: #212529;
      font-size: 14px;

      &:focus {
        outline: 1px solid #0d6efd;
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
  }
</style>
