<template>
  <div class="Lr--autocomplete" :class="{disabled: disabled}">
    <label class="Lr--autocomplete__label">{{ label }}</label>
    <span class="Lr--search__icon">
      <svgLoader name="search" />
    </span>
    <input
      type="text"
      :modelValue="model"
      :value="showText"
      class="Lr--autocomplete__field"
      @input="getInput"
      :placeholder="placeholder"
      @click="open = !open" />
    <span class="Lr--angle__icon">
      <svgLoader v-if="open" name="chevron_up" size="18" />
      <svgLoader v-else name="chevron_down" size="18" />
    </span>
    <div
      class="Lr--autocomplete__list"
      v-if="open"
      v-click-outside="onClickOutside">
      <div
        class="Lr--autocomplete__list--item"
        v-for="(item, i) in items"
        :key="i"
        @click="setInput(item)">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormAutoComplete'
  });
</script>
<script lang="ts" setup>
  import {computed, ref, watch} from 'vue';
  import {ISelect} from './types/types';

  interface Props {
    modelValue: string;
    items: ISelect[];
    placeholder?: string;
    label?: string;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    items: () => [],
    disabled: false
  });
  const emits = defineEmits<{
    (e: 'update:modelValue', items: string): void;
  }>();

  // variables
  const showText = ref();
  const model = ref('');
  const open = ref(false);
  const initData = ref(props.items);
  const valueId = ref(props.modelValue);

  watch(
    () => props.items,
    value => {
      if (value === undefined) {
        return;
      }
      initData.value = value;
      filterData(value, valueId.value);
    },
    {deep: true, immediate: true}
  );

  watch(
    () => props.modelValue,
    value => {
      if (value === undefined) {
        return;
      }
      valueId.value = value;
      filterData(initData.value, valueId.value);
    },
    {deep: true, immediate: true}
  );

  const items = computed(() => {
    if (model.value.length) {
      return initData.value.filter((e: any) => {
        let searchWord = model.value.toLowerCase();
        return e.value.toLowerCase().indexOf(searchWord) >= 0;
      });
    } else {
      return initData.value;
    }
  });

  // methods
  function getInput(e: any) {
    showText.value = e.target.value;
    model.value = e.target.value;
  }
  function onClickOutside(e: any) {
    open.value = false;
  }
  function setInput(value: any) {
    showText.value = value.value;
    model.value = value;
    open.value = false;
    emits('update:modelValue', value.id);
  }
  function filterData(items: ISelect[], id: string) {
    if (items === undefined) {
      return;
    }
    const filtered = items.filter(item => item.id === id);
    showText.value = filtered.map(item => {
      return item.value;
    });
  }
</script>
<style lang="scss" scoped>
  .Lr--autocomplete {
    position: relative;
    &.disabled {
      .Lr--autocomplete__field {
        pointer-events: none;
        background-color: #e9ecef;
        border: 1px solid #e9ecef;
      }
      .Lr--search__icon {
        display: none;
      }
      .Lr--angle__icon {
        display: none;
      }
      .Lr--autocomplete__label {
        background-color: inherit;
      }
    }
    .Lr--autocomplete__label {
      position: absolute;
      top: -10px;
      right: 10px;
      background-color: #fff;
      padding: 0 10px;
      color: #212529;
    }

    .Lr--search__icon {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      height: 24px;
    }

    .Lr--angle__icon {
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      background-color: #ecf4ff;
      border-radius: 100px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .Lr--autocomplete__field {
      border: 1px solid #212529;
      border-radius: 4px;
      padding: 16px 33px 16px 16px;
      width: 100%;
      color: #212529;
      font-size: 14px;

      &:focus {
        outline: 1px solid #0d6efd;
      }
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: #797869;
      border-radius: 10px;
    }

    .Lr--autocomplete__list {
      direction: ltr;
      background-color: #dee2e6;
      position: absolute;
      border-radius: 4px;
      top: 63px;
      left: 0;
      right: 0;
      z-index: 10;
      max-height: 300px;
      overflow-y: auto;

      .Lr--autocomplete__list--item {
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
