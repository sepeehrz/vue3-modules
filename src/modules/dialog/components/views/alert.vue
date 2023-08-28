<template>
  <div v-if="dialog" class="dialog">
    <div class="dialog-header">
      <div
        v-if="dialog.type == 'warning'"
        class="dialog-icon warning-icon"></div>
      <div
        v-else-if="dialog.type == 'info'"
        class="dialog-icon info-icon"></div>
      <div
        v-else-if="dialog.type == 'question'"
        class="dialog-icon question-icon"></div>
      <div v-else-if="dialog.type == 'error'" class="dialog-icon error-icon">
        <i :class="[dialog.icon ? `las ${dialog.icon}` : 'las la-times']"></i>
      </div>
      <div
        v-else-if="dialog.type == 'success'"
        class="dialog-icon success-icon">
        <i :class="[dialog.icon ? `las ${dialog.icon}` : 'las la-check']"></i>
      </div>
      <h2 v-if="dialog.title" class="dialog-title">{{ dialog.title }}</h2>
      <i
        class="dialog-close las la-times"
        @click="$emit('close', 'close dialog')"></i>
    </div>
    <div class="dialog-content">
      <div
        v-if="dialog.message"
        class="dialog-message"
        v-html="dialog.message"></div>
    </div>
    <div class="dialog-actions">
      <button @click="$emit('hide', true)">{{ dialog.ok_txt }}</button>
    </div>
    <div class="dialog-footer"></div>
  </div>
</template>
<script lang="ts" setup>
  import {IDialog} from '../../types/types';
  interface Props {
    dialog: IDialog;
  }

  defineProps<Props>();
</script>
