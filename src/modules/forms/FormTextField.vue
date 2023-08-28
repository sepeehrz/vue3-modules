<template>
  <div
    class="Lr--text__field"
    :class="{
      error: error.length && showError && !disabled,
      disabled: disabled
    }">
    <label v-if="label" class="Lr--label">
      {{ label }}
    </label>
    <input
      ref="textField"
      v-model="model"
      :type="typeInput"
      :name="name"
      :placeholder="placeholder"
      class="Lr--input"
      autocomplete="off"
      @input="input"
      @blur="checkValidation"
      @focus="focus" />
    <div v-if="hint" class="Lr--input__hint">
      {{ hint }}
    </div>
    <div class="Lr--input__icon" v-if="icon" @click="$emit('clicked-icon')">
      <svgLoader :name="icon" />
    </div>
    <span
      v-for="(item, index) in error"
      :key="index"
      class="Lr--validation__message">
      {{ showError ? item + '.' + '\xa0' : '' }}
    </span>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormTextField'
  });
</script>
<script lang="ts" setup>
  import {useModel} from './controller/model';
  import {validations, IValidation} from '@dashboard/utils';
  import {ref, watch} from 'vue';
  import {useRoute} from 'vue-router';
  interface Props {
    modelValue: string | number;
    placeholder?: string;
    name?: string;
    validation?: IValidation[];
    label?: string;
    hint?: string;
    typeInput?: string;
    icon?: string;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    typeInput: 'text',
    disabled: false
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
    (e: 'input'): void;
  }>();

  const error: any = ref([]);
  const {model} = useModel(props, emits);
  const $Route = useRoute();
  const $validation = validations();
  const showError = ref(true);

  watch(
    () => props.modelValue,
    () => {
      if ($Route.params.id && showError.value) {
        checkValidation();
      }
    },
    {immediate: true}
  );

  function checkValidation() {
    showError.value = true;
    if (props.validation && props.validation.length !== 0) {
      $validation
        .validationItem(props.validation, model.value, props.label)
        .then((e: any) => {
          error.value = e;
        });
    }
  }
  function input() {
    emits('input');
  }
  function focus() {
    showError.value = false;
  }
</script>

<style lang="scss" scoped>
  .Lr--text__field {
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
      .Lr--input__icon {
        display: none;
      }
      .Lr--validation__message {
        display: none;
      }
    }

    &.error {
      .Lr--label {
        color: #dc3545;
      }

      .Lr--input {
        border: 1px solid #dc3545;
        color: #dc3545;

        &:focus {
          outline: none;
        }
      }
    }

    .Lr--input__icon {
      position: absolute;
      left: 5px;
      top: 10px;
      font-size: 20px;
      background-color: #ecf4ff;
      border-radius: 100px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .Lr--input__hint {
      font-size: 12px;
      font-weight: 500;
      padding-right: 5px;
    }

    .Lr--validation__message {
      color: #dc3545;
      margin-top: 10px;
      display: inline-block;
    }

    .Lr--input {
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
