<template>
  <div>
    <Header
      v-if="!hideHeaders"
      :title="title"
      :createUrl="createUrl"
      :withoutHeader="withoutHeader"
      :hideActionBar="hideActionBar" />
    <Filters
      v-if="!hideFilters"
      :filters="filters"
      @multiple-filters-data="multipleFilterHandle"
      @single-filters-data="singleFilterHandle"
      :querySearch="querySearch" />
    <table class="Lr--data__table">
      <Thead
        v-if="!hideTableHeaders"
        :headers="headers"
        @change-current-sort="e => (currentSort = e)"
        @change-current-sort-dir="e => (currentSortDir = e)"
        :withoutAction="withoutAction" />
      <Tbody
        :items="items"
        :current-sort="currentSort"
        :current-sort-dir="currentSortDir"
        @delete="_delete"
        :actions="actions"
        :editUrl="editUrl"
        :deleteAction="deleteAction"
        :hideActionDelete="hideActionDelete"
        :hideActionEdit="hideActionEdit"
        :withoutAction="withoutAction"
        :showViewAction="showViewAction">
        <template #data="{item}">
          <slot name="data" :item="item" />
        </template>
      </Tbody>
      <Loader :loading="loading" />
    </table>
    <Pagination
      v-if="withPagination && items && items.length !== 0"
      :pagination="pagination"
      @update="changePage" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'DataGrid'
  });
</script>
<script lang="ts" setup>
  import Thead from './sections/Thead.vue';
  import Tbody from './sections/Tbody.vue';
  import Filters from './sections/Filters.vue';
  import Header from './sections/Header.vue';
  import Pagination from './sections/Pagination.vue';
  import Loader from '../loader.vue';
  import {
    IHeaders,
    ITitle,
    IFilters,
    IPagination,
    IAction
  } from './types/dataTypes';
  import {ref, onMounted, inject} from 'vue';

  const $toast: any = inject('toast');
  interface Props {
    headers?: IHeaders[];
    filters?: IFilters[];
    title: ITitle;
    withoutAction?: boolean;
    withoutHeader?: boolean;
    hideActionEdit?: boolean;
    hideActionDelete?: boolean;
    withPagination?: boolean;
    hideHeaders?: boolean;
    hideTableHeaders?: boolean;
    showViewAction?: boolean;
    hideFilters?: boolean;
    querySearch?: boolean;
    hideActionBar?: boolean;
    actions?: IAction[];
    deleteService?: (value: object) => void;
    queryService?: any;
    service?: any;
    createUrl?: () => void;
    editUrl?: (items: object) => void;
    deleteAction?: (items: object) => void;
  }
  const props = withDefaults(defineProps<Props>(), {
    withPagination: true,
    querySearch: false,
    showViewAction: false
  });
  const loading = ref(false);
  const items = ref<object[]>([]);
  const currentSortDir = ref('');
  const currentSort = ref('');
  const filter = ref();
  const pagination = ref<IPagination>({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10
  });

  onMounted(() => {
    _query();
  });

  function changePage(page: any) {
    pagination.value.currentPage = page;
    _query();
  }
  function _query() {
    let params: any = {};
    if (props.withPagination) {
      (params.page = pagination.value.currentPage),
        (params.pageSize = pagination.value.pageSize);
    }
    if (props.filters && props.filters.length) {
      params.filters = JSON.stringify(filter.value);
    }
    if (props.querySearch) {
      params.search = filter.value;
    }
    let service = props.queryService
      ? props.queryService(params)
      : props.service.$query(params);
    service
      .then((res: any) => {
        loading.value = true;
        items.value = res.data.data;
        pagination.value.totalPages = res.data.totalPages;
        pagination.value.pageSize = res.data.pageSize;
        pagination.value.currentPage = res.data.currentPage;
      })
      .finally(() => {
        loading.value = false;
      });
  }
  function multipleFilterHandle(filters: string[]) {
    filter.value = filters;
    _query();
  }

  function singleFilterHandle(filters: string) {
    filter.value = filters;
    _query();
  }
  async function _delete(item: any) {
    let service = props.deleteService
      ? props.deleteService(item.id)
      : props.service.$delete(item.id);
    service
      .then(() => {
        _query();
        $toast
          .bgcolor('#bfddcf')
          .color('#198754')
          .left()
          .bottom()
          .showSimple('آیتم با موفقت حذف شد');
      })
      .catch(() => {
        $toast
          .bgcolor('#f5c6cb')
          .color('#DC3545')
          .left()
          .bottom()
          .showSimple('خطایی رخ داده است لطفا مجدد تلاش کنید');
      });
  }
</script>

<style lang="scss">
  .Lr--data__table {
    direction: rtl;
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;

    th {
      background: #dee2e6;
      color: #212529;
    }

    td,
    th {
      border: 1px solid #0000000d;
      text-align: right;
      font-size: 16px;
      height: 40px;
      padding-right: 5px;
    }

    tr:nth-child(even) {
      background-color: #0000000d;
    }
  }
</style>
