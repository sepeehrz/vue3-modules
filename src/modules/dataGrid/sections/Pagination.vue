<template>
  <div class="Lr--pagination">
    <div class="lr--pagination__counter">
      <VueAwesomePaginate
        v-model="page"
        :total-items="total_items"
        :items-per-page="pagination.pageSize"
        :on-click="updateHandler">
        <template #prev-button>
          <i class="las la-angle-right"></i>
        </template>

        <template #next-button>
          <i class="las la-angle-left"></i>
        </template>
      </VueAwesomePaginate>
    </div>
    <div class="lr--pagination__details">
      <div>{{ pagination.currentPage }} از {{ pagination.totalPages }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {ref, computed} from 'vue';
  import {IPagination} from '../types/dataTypes';

  interface Props {
    pagination?: IPagination | any;
  }
  const props = withDefaults(defineProps<Props>(), {
    pagination: () => []
  });

  const emits = defineEmits<{
    (e: 'update', items: object): void;
  }>();
  const total_items = computed(() => {
    return props.pagination.pageSize * props.pagination.totalPages;
  });

  const page = ref(1);

  function updateHandler(e: any) {
    emits('update', e);
  }
</script>
<style lang="scss">
  .Lr--pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;

    .pagination-container {
      border-radius: 5px;
      padding: 10px 0px;
    }

    .paginate-buttons {
      width: 40px;
      height: 40px;
      margin-inline: 5px;
      cursor: pointer;
      border: none;
      background-color: transparent;
      border-radius: 2px;

      &:hover {
        background-color: #e5e5e5;
      }
    }

    .back-button {
      width: 70px;

      &:active {
        background-color: #dedede;
      }
    }

    .next-button {
      width: 70px;

      svg {
        transform: rotate(180deg);
      }

      &:active {
        background-color: #dedede;
      }
    }

    .active-page {
      background-color: #2980b9;
      color: #fff;

      &:hover {
        background-color: #3b8cc3;
        color: #fff;
      }
    }
  }
</style>
