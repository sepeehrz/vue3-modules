<template>
  <div v-for="dialog in dialogs" :key="dialog.id">
    <dialogWindow :dialog="dialog" @close="close" @hide="hide"></dialogWindow>
  </div>
</template>
<script lang="ts">
  import dialogWindow from './dialog-window.vue';
  import {defineComponent} from 'vue';
  import {dialogItems} from '../dialog';
  import type {IDialog} from '../types/types';

  export default defineComponent({
    components: {
      dialogWindow
    },
    data() {
      return {
        dialogs: dialogItems
      };
    },
    methods: {
      commit(data: any) {
        this.dialogs.push(data);
      },
      hide({dialog, data}: any) {
        dialog.show = false;
        let dialogIndex = this.dialogs.findIndex(
          (item: IDialog) => item.id == dialog.id
        );
        if (dialogIndex !== -1) {
          dialog.destroy();
          this.dialogs.splice(dialogIndex, 1);
        }
        dialog.resolve(data);
      },
      close({dialog}: any) {
        dialog.show = false;
        let dialogIndex = this.dialogs.findIndex(
          (item: IDialog) => item.id == dialog.id
        );
        if (dialogIndex !== -1) {
          dialog.destroy();
          this.dialogs.splice(dialogIndex, 1);
        }
        dialog.resolve(false);
      }
    }
  });
</script>

<style lang="scss">
  .dialog-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
  }

  .dialog-wrapper {
    background: #fff;
    padding: 0;
    max-width: 100%;
    border-radius: 28px;
    position: relative;
    display: block;
    overflow: auto;
  }

  .dialog {
    width: 312px;
  }

  .dialog-header {
    display: flex;
    align-items: center;
    flex-direction: column;

    .dialog-custom-icon {
      font-size: 30px;
      padding: 24px 0 16px;
    }

    .dialog-icon {
      display: flex;
      position: relative;
      box-sizing: content-box;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 5rem;
      zoom: normal;
      border: 0.25em solid transparent;
      border-radius: 50%;
      line-height: 5rem;
      cursor: default;
      user-select: none;
      margin: 24px 0 16px;

      &:before,
      .v-icon {
        font-size: 3.75rem;
      }

      &.warning-icon {
        border-color: #facea8;
        color: #f8bb86;

        &:before {
          content: '!';
          margin-top: 8px;
        }
      }

      &.error-icon {
        border-color: #f27474;

        i {
          color: darken(#f27474, 20);
          font-size: 40px;
        }
      }

      &.success-icon {
        border-color: rgba(#a5dc86, 0.5);

        i {
          color: darken(#a5dc86, 20);
          font-size: 40px;
        }
      }

      &.info-icon {
        border-color: #9de0f6;
        color: #3fc3ee;

        &:before {
          content: 'i';
          margin-top: 8px;
        }
      }

      &.question-icon {
        border-color: #c9dae1;
        color: #87adbd;

        &:before {
          content: '؟';
          margin-top: 8px;
        }
      }
    }
  }

  .dialog-title {
    font-weight: 500;
    font-size: 1.175rem;
    color: #1c1b1f;
    margin: 0 0 1rem;
  }

  .dialog-message {
    color: #49454f;
    text-align: center;
    border-bottom: 1px solid #80bdff;
    padding-bottom: 16px;
  }

  .dialog-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: inherit;
    margin: 24px 0;

    button {
      color: #000;
      padding: 10px 24px;
      border-radius: 100px;
      border: 1px solid #ccc;
      cursor: pointer;

      &:first-child {
        margin-left: 8px;
        color: #1c1d06;
        background-color: #ced4da;
      }

      &:nth-child(2) {
        background-color: #0d6efd;
        color: #fff;
      }
    }
  }

  .dialog-close {
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: #4b1897;
    }
  }

  .backdrop {
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: -1;
  }
</style>
