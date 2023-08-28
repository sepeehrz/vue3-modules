<template>
  <div v-if="dialog" class="dialog">
    <div class="dialog-header">
      <div
        v-if="dialog.type == 'warning'"
        class="dialog-icon warning-icon"></div>
      <div v-if="dialog.type == 'info'" class="dialog-icon info-icon"></div>
      <div
        v-if="dialog.type == 'question'"
        class="dialog-icon question-icon"></div>
      <div v-if="dialog.type == 'error'" class="dialog-icon error-icon">
        <i class="las la-times"></i>
      </div>
      <div v-if="dialog.type == 'success'" class="dialog-icon success-icon">
        <i class="las la-check"></i>
      </div>
      <h2 v-if="dialog.title" class="dialog-title">{{ dialog.title }}</h2>
      <h2 v-if="dialog.title" class="dialog-title">{{ dialog.title }}</h2>
      <i
        class="dialog-close las la-times"
        @click="$emit('close', 'close dialog')"></i>
    </div>
    <div class="dialog-content">
      <div class="form-section">
        <div class="form-group">
          <input v-model="prompt" type="text" />
        </div>
      </div>
    </div>
    <div class="dialog-actions">
      <button @click="$emit('hide', prompt)">
        {{ dialog.ok_txt }}
      </button>
      <button @click="$emit('close', 'close dialog')">
        {{ dialog.cancel_txt }}
      </button>
    </div>
    <div class="dialog-footer"></div>
  </div>
</template>
<script lang="ts" setup>
  import {IDialog} from '../../types/types';
  import {ref} from 'vue';
  interface Props {
    dialog: IDialog;
  }

  const props = defineProps<Props>();
  const prompt = ref(props.dialog.prompt);
</script>
