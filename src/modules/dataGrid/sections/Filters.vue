<template>
  <div class="Lr--data-table__search">
    <slot name="filters"></slot>
    <div
      v-for="(item, index) in filters"
      :key="index"
      class="Lr--data-table__filters">
      <template v-if="item.type === 'select'">
        <FormSelect
          v-model="data_filters[item.model]"
          :items="item.items"
          :placeholder="item.label"
          @input="changeFilter" />
      </template>
      <template v-else-if="item.type === 'date'">
        <FormDatePicker
          v-model="data_filters[item.model]"
          @input="changeFilter" />
      </template>
      <template v-else>
        <FormTextField
          v-model="data_filters[item.model]"
          :placeholder="item.label"
          :name="item.name"
          :validation="item.validation"
          @input="changeFilter" />
      </template>
    </div>
    <template v-if="querySearch">
      <FormTextField
        class="Lr--data-table__text"
        v-model="search"
        label="جستجو"
        placeholder="کلمه مورد نظر خود را جستجو نمایید"
        name="search"
        @input="changeQuerySearch" />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {IFilters} from '../types/dataTypes';

  interface Props {
    filters?: IFilters[];
    querySearch?: boolean;
  }
  defineProps<Props>();
  const emits = defineEmits<{
    (e: 'multipleFiltersData', items: string[]): void;
    (e: 'singleFiltersData', items: string): void;
  }>();
  const data_filters = ref<Record<string, string>>({});
  const search = ref('');
  function changeFilter() {
    let fetchData = [];
    for (const [key, value] of Object.entries(data_filters.value)) {
      if (typeof value === 'object') {
        fetchData.push(`${key}:${Object.values(value)[0]}`);
      } else {
        fetchData.push(`${key}: ${value}`);
      }
    }
    emits('multipleFiltersData', fetchData);
  }
  function changeQuerySearch() {
    emits('singleFiltersData', search.value);
  }
</script>
<style lang="scss" scoped>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  .Lr--data-table__search {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    padding: 40px 10px;
    overflow: hidden;

    .Lr--data-table__filters {
      margin-left: 20px;
      width: calc(25% - 20px);
      margin-bottom: 15px;
    }

    .Lr--data-table__text {
      width: 30%;
    }
  }
</style>
