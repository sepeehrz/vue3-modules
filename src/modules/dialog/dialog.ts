import {App, Plugin, ref} from 'vue';
import DefaultView from './components/views/default.vue';
import AlertView from './components/views/alert.vue';
import ConfirmView from './components/views/confirm.vue';
import PromptView from './components/views/prompt.vue';
import type {IDialog} from './types/types';

export const dialogItems = ref<IDialog[]>([]);

class Dialog {
  dialog: IDialog = {};
  options: IDialog = {};
  ok(ok_txt: string) {
    this.dialog.ok_txt = ok_txt;
    return this;
  }
  cancel(cancel_txt: string) {
    this.dialog.cancel_txt = cancel_txt;
    return this;
  }
  message(message: string) {
    this.dialog.message = message;
    return this;
  }
  title(title: string) {
    this.dialog.title = title;
    return this;
  }
  model(model: string) {
    this.dialog.prompt = model;
    return this;
  }
  icon(icon: string) {
    this.dialog.icon = icon;
    return this;
  }
  component(component: any) {
    this.dialog.component = component;
    return this;
  }
  wrapper(wrapper: any) {
    this.options.wrapper = wrapper;
    return this;
  }
  warning() {
    this.dialog.type = 'warning';
    return this;
  }
  info() {
    this.dialog.type = 'info';
    return this;
  }
  question() {
    this.dialog.type = 'question';
    return this;
  }
  success() {
    this.dialog.type = 'success';
    return this;
  }
  error() {
    this.dialog.type = 'error';
    return this;
  }
  alert(dialog: IDialog = {}) {
    dialog = Object.assign(this.dialog, dialog);
    dialog.component = AlertView;
    dialog.ok_txt = dialog.ok_txt || 'باشه';
    return this.show(dialog);
  }
  prompt(dialog: IDialog = {}) {
    dialog = Object.assign(this.dialog, dialog);
    dialog.component = PromptView;
    dialog.ok_txt = dialog.ok_txt || 'تمام';
    dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم';
    return this.show(dialog);
  }
  confirm(dialog: IDialog = {}) {
    dialog = Object.assign(this.dialog, dialog);
    dialog.component = ConfirmView;
    dialog.title = dialog.title || 'آیا از انجام این کار مطمعن هستید؟';
    dialog.message = dialog.message || 'این کار برگشت ناپذیر می باشد!';
    dialog.type = dialog.type || 'warning';
    dialog.ok_txt = dialog.ok_txt || 'انجام بده';
    dialog.cancel_txt = dialog.cancel_txt || 'منصرف شدم';
    return this.show(dialog);
  }
  show(dialog: IDialog = {}) {
    const dialog_options: IDialog = Object.assign(this.dialog, dialog);

    if (!dialog_options.component) {
      dialog_options.component = DefaultView;
    }
    return new Promise((resolve, reject) => {
      dialog_options.id = 'dialog.' + Date.now();
      dialog_options.resolve = resolve;
      dialog_options.reject = reject;
      dialog_options.destroy = this.destroy;
      dialogItems.value.push(dialog_options);
    });
  }
  destroy() {
    const element = document.querySelector('.dialog-container');
    element?.remove();
  }
}

export const DialogPlugin: Plugin = {
  install(app: App) {
    const instance = new Dialog();
    app.config.globalProperties.dialog = instance;
    app.provide('dialog', instance);
  }
};
export default DialogPlugin;
