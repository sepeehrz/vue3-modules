<template>
  <thead>
    <tr>
      <th width="5%">#</th>
      <th
        v-for="(item, index) in custom_headers"
        :key="index"
        :class="{'Lr--sorted__column': item.sortable}"
        :width="item.width"
        @click="sortTable(item)"
        :style="{textAlign: item.align}">
        {{ item.text }}
        <i
          v-if="item.sortable && currentSortDir === 'asc'"
          class="las la-sort-down"></i>
        <i
          v-if="item.sortable && currentSortDir === 'desc'"
          class="las la-sort-up"></i>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts" setup>
  import {IHeaders} from '../types/dataTypes';
  import {computed, ref} from 'vue';
  interface Props {
    headers?: IHeaders[];
    withoutAction?: boolean;
  }
  const props = defineProps<Props>();
  const emits = defineEmits<{
    (e: 'edit', items: object): void;
    (e: 'changeCurrentSort', items: string): void;
    (e: 'changeCurrentSortDir', items: string): void;
  }>();

  const currentSort = ref('id');
  const currentSortDir = ref('asc');

  function sortTable(value: IHeaders | any) {
    if (value.sortable) {
      if (value.value === currentSort.value) {
        currentSortDir.value = currentSortDir.value === 'asc' ? 'desc' : 'asc';
        emits('changeCurrentSortDir', currentSortDir.value);
      }
    }
    currentSort.value = value.value;
    emits('changeCurrentSort', currentSort.value);
  }
  const custom_headers = computed(() => {
    let headers = props.headers;
    let action_exist = props.headers?.some(
      (item: any) => item.name == 'action'
    );
    if (!action_exist && !props.withoutAction) {
      headers?.push({
        text: 'عملیات',
        name: 'action',
        align: 'right',
        width: '15%'
      });
    }
    return headers;
  });
</script>

<style lang="scss">
  .Lr--sorted__column {
    cursor: pointer;
  }
</style>
