<template>
  <div
    class="Lr--select__wrapper"
    v-click-outside="onClickOutside"
    :class="{disabled: disabled}">
    <label v-if="label" class="Lr--select__label">
      {{ label }}
    </label>
    <div class="Lr--select__selected" @click="open = !open">
      {{ selected ? selected : placeHolder }}
      <svgLoader v-if="open" name="chevron_up" size="18" class="select__icon" />
      <svgLoader v-else name="chevron_down" size="18" class="select__icon" />
    </div>
    <div v-if="open" class="Lr--select__items">
      <div
        v-for="(item, index) in items"
        :key="index"
        @click="handleItems(item)">
        {{ item.value }}
      </div>
    </div>
    <span
      v-for="(item, index) in error"
      :key="index"
      class="Lr--validation__message">
      {{ item + '.' + '\xa0' }}
    </span>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormSelect'
  });
</script>
<script lang="ts" setup>
  import {ref, watch} from 'vue';
  import {ISelect} from './types/types';
  import {validations, IValidation} from '@dashboard/utils';
  import {useRoute} from 'vue-router';

  interface Props {
    modelValue: string | number;
    items: ISelect[];
    placeholder?: string;
    label?: string;
    validation?: IValidation[];
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    items: () => [],
    disabled: false
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', id: string | number): void;
  }>();

  const open = ref(false);
  const items = ref(props.items);
  const valueId = ref(props.modelValue);
  const $validation = validations();
  const error: any = ref([]);
  const $Route = useRoute();
  const selected = ref();
  const placeHolder = ref(props.placeholder);
  watch(
    () => props.items,
    value => {
      if (value === undefined) {
        return;
      }
      if (!value) {
        return;
      }
      if (value.length === 0) {
        return;
      }

      items.value = value;
      filterData(value, valueId.value);
    },
    {deep: true, immediate: true}
  );

  watch(
    () => props.modelValue,
    value => {
      if ($Route.params.id) {
        checkValidation();
      }
      if (value === undefined) {
        return;
      }
      if (!value) {
        return;
      }

      // checkValidation()
      valueId.value = value;
      filterData(items.value, value);
    },
    {deep: true, immediate: true}
  );

  function handleItems(value: ISelect) {
    open.value = false;
    selected.value = value.value;
    emits('update:modelValue', value.id);
  }
  function onClickOutside() {
    open.value = false;
  }
  function filterData(items: ISelect[], id: string | number) {
    if (items === undefined) {
      return;
    }

    if (!id) {
      return;
    }
    const filtered = items.filter(item => item.id === id);
    selected.value = filtered
      .map(item => {
        return item.value;
      })
      .toString();
  }
  function checkValidation() {
    // if (props.validation && props.validation.length !== 0) {
    //   $validation
    //     .validationItem(props.validation, selected.value, props.label)
    //     .then((e: any) => {
    //       error.value = e;
    //     });
    // }
  }
</script>

<style lang="scss" scoped>
  .Lr--select__wrapper {
    position: relative;
    &.disabled {
      .Lr--select__selected {
        pointer-events: none;
        background-color: #e9ecef;
        border: 1px solid #e9ecef;
        .select__icon {
          display: none;
        }
      }

      .Lr--select__label {
        background-color: inherit;
      }
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: #797869;
      border-radius: 10px;
    }

    .Lr--select__label {
      position: absolute;
      top: -10px;
      right: 10px;
      background-color: #fff;
      padding: 0 10px;
      color: #212529;
    }

    .Lr--select__selected {
      border: 1px solid #212529;
      border-radius: 4px;
      width: 100%;
      color: #212529;
      font-size: 14px;
      height: 56px;
      line-height: 56px;
      vertical-align: middle;
      text-align: right;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;

      .select__icon {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 20px;
        background-color: #ecf4ff;
        border-radius: 100px;
        padding: 7px;
      }
    }

    .Lr--validation__message {
      color: #dc3545;
      margin-top: 10px;
      display: inline-block;
    }

    .Lr--select__items {
      direction: ltr;
      background-color: #dee2e6;
      border-radius: 4px;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      z-index: 1;
      max-height: 300px;
      overflow-y: auto;

      div {
        padding: 0 16px;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        text-align: right;
        color: #1c1b1f;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;

        &:hover {
          background-color: #ced2d6;
        }
      }
    }
  }
</style>
