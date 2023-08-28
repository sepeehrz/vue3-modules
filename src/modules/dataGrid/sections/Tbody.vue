<template>
  <tbody>
    <tr v-for="(rows, index) in items" :key="index">
      <td>{{ index + 1 }}</td>
      <slot name="data" :item="rows" />
      <td v-if="!withoutAction">
        <div class="Lr--actions__data-table">
          <slot name="actions_right" :data="rows"></slot>
          <slot name="actions" :data="rows">
            <div v-if="actions" class="more-action">
              <button class="data-table-action-buttons">
                <i class="las la-ellipsis-v" @click="showMenuItem(index)"></i>
              </button>
              <ul
                class="more-actions-menu"
                v-if="showMenu === index"
                v-click-outside="onClickOutside">
                <li
                  v-for="(item, index) in actions"
                  :key="index"
                  @click="
                    item.cb(rows);
                    showMenu = null;
                  ">
                  <i :class="item.icon"></i>
                  {{ item.title }}
                </li>
              </ul>
            </div>
            <button
              class="data-table-action-buttons"
              v-if="!hideActionEdit"
              @click="_edit(rows)">
              <svgLoader name="edit" />
            </button>
            <button
              class="data-table-action-buttons"
              v-if="showViewAction"
              @click="_view(rows)">
              <svgLoader name="eye" stroke="#000" />
            </button>

            <button
              class="data-table-action-buttons"
              v-if="!hideActionDelete"
              @click="_delete(rows)">
              <svgLoader name="trash" />
            </button>
          </slot>
          <slot name="actions_left" :data="rows"></slot>
        </div>
      </td>
    </tr>
    <div v-if="items && items.length === 0" class="Lr--tbody__no--result">
      موردی یافت نشد
    </div>
  </tbody>
</template>
<script lang="ts" setup>
  import {IAction} from '../types/dataTypes';
  import {inject} from 'vue';
  import {useRouter, useRoute} from 'vue-router';
  import {ref} from 'vue';
  interface Props {
    items: object[];
    withoutAction?: boolean;
    hideActionEdit?: boolean;
    hideActionDelete?: boolean;
    hideActionRecycle?: boolean;
    showViewAction?: boolean;
    actions?: IAction[];
    currentSort: string;
    currentSortDir: string;
    editUrl?: (items: object) => void;
    deleteAction?: (items: object) => void;
  }
  const props = defineProps<Props>();

  const emits = defineEmits<{
    (e: 'edit', items: object): void;
    (e: 'delete', items: object): void;
  }>();

  const $dialog: any = inject('dialog');
  const Router = useRouter();
  const Route = useRoute();
  const showMenu = ref();

  function _edit(value: any) {
    if (props.editUrl) {
      props.editUrl(value);
    } else {
      let url = Route.path + '/' + value.id;
      Router.push(url);
    }
  }
  function _view(value: any) {
    let url = Route.path + '/' + value.id;
    Router.push(url);
  }
  function showMenuItem(index: any) {
    showMenu.value = index;
  }
  function onClickOutside(e: any) {
    showMenu.value = null;
  }
  async function _delete(value: object) {
    if (props.deleteAction) {
      props.deleteAction(value);
    } else {
      let confirm = await $dialog.confirm({
        ok_txt: 'بله',
        cancel_txt: 'خیر',
        icon: 'trash',
        title: 'آیا از حذف این آیتم اطمینان دارید ؟ '
      });
      if (confirm) {
        emits('delete', value);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .Lr--tbody__no--result {
    text-align: center;
    width: calc(100vw - 360px);
    padding: 30px 0;
    color: #000;
    font-weight: bold;
  }

  .Lr--actions__data-table {
    display: flex;

    .more-action {
      position: relative;
    }

    .data-table-action-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: inherit;
      border: none;
      font-size: 20px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      padding: 15px;

      &:hover {
        background-color: #ccc;
        border-radius: 100%;
      }
    }

    .more-actions-menu {
      padding: 0;
      box-shadow: 0px 0px 5px 0px rgba(204, 204, 204, 1);
      list-style-type: none;
      background-color: #fff;
      position: absolute;
      top: -12px;
      left: 20px;
      z-index: 2;

      li {
        display: flex;
        align-items: center;
        width: 200px;
        padding: 7px 10px;

        i {
          margin-left: 5px;
          font-size: 18px;
        }

        &:hover {
          background-color: #ccc;
          cursor: pointer;
        }
      }
    }
  }
</style>
