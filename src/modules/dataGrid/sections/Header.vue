<template>
  <div class="Lr--data-table__header" v-if="!withoutHeader">
    <slot name="header">
      <div class="Lr--data-table__header-label">
        <h3 class="Lr--data-table__head-title">{{ title.text }}</h3>
      </div>
      <div v-if="!hideActionBar" class="Lr--data-table__header-toolbar">
        <slot name="header_add">
          <button class="Lr--data-table__header-create" @click="create">
            <svgLoader
              name="plus"
              stroke="#0D6EFD"
              class="header-create_icon" />
            افزودن
          </button>
        </slot>
        <slot name="toollbar_left"></slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup>
  import {useRouter, useRoute} from 'vue-router';
  import {ITitle} from '../types/dataTypes';

  interface Props {
    title: ITitle;
    hideActionBar?: boolean;
    withoutHeader?: boolean;
    createUrl?: () => void;
  }
  const props = withDefaults(defineProps<Props>(), {
    hideActionBar: false
  });

  const $router = useRouter();
  const $route = useRoute();

  function create() {
    if (props.createUrl) {
      props.createUrl();
    } else {
      $router.push($route.path + '/create');
    }
  }
</script>
<style lang="scss" scoped>
  .Lr--data-table__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ebedf2;
    min-height: 60px;
    align-items: center;
    padding: 0 25px;

    .Lr--data-table__header-label {
      display: flex;
      align-items: center;

      .Lr--data-table__head-title {
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
        font-weight: 500;
        color: #464457;
      }
    }

    .Lr--data-table__header-toolbar {
      .Lr--data-table__header-create {
        border-radius: 40px;
        background-color: #fff;
        border: 1px solid #0d6efd;
        cursor: pointer;
        color: #0d6efd;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding: 10px 16px 10px 24px;

        .header-create_icon {
          margin-left: 8px;
        }

        &:hover {
          background-color: #0d6efd;
          color: #fff;

          ::v-deep(.Lr--svg__loader) {
            svg {
              stroke: #fff !important;
            }
          }
        }
      }
    }
  }
</style>
