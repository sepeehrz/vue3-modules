import {App, Plugin, h, render} from 'vue';
import ToastComponent from './view/toast.vue';

const CONFIG = {
  timeout: 4000
};

interface IToast {
  top?: boolean;
  bottom?: boolean;
  right?: boolean;
  left?: boolean;
  message?: string;
  color?: string;
  bgcolor?: string;
  timeout?: number;
  show?: boolean;
  id?: string;
  resolve?: any;
  reject?: any;
  type?: 'warning' | 'info' | 'success' | 'error';
}
class Toast {
  toast: IToast = {};
  $root: any = {};
  mounted: boolean;
  constructor(globalOptions: any = {}) {
    this.toast = Object.assign(CONFIG, globalOptions);
    this.mounted = false;
  }
  mountIfNotMounted() {
    if (this.mounted === true) {
      return;
    }
    this.$root = (() => {
      const vNode = h(ToastComponent);
      const container = document.createElement('div');
      container.setAttribute('id', 'lr--toast');
      document.querySelector('#app')?.appendChild(container);
      render(vNode, container);
      return vNode.component;
    })();
    this.mounted = true;
  }

  top() {
    this.toast.top = true;
    return this;
  }
  bottom() {
    this.toast.bottom = true;
    return this;
  }
  right() {
    this.toast.right = true;
    return this;
  }
  left() {
    this.toast.left = true;
    return this;
  }
  message(message: string) {
    this.toast.message = message;
    return this;
  }
  bgcolor(color: string) {
    this.toast.bgcolor = color;
    return this;
  }
  color(color: string) {
    this.toast.color = color;
    return this;
  }
  timeout(timeout: number) {
    this.toast.timeout = timeout;
    return this;
  }
  success() {
    this.toast.bgcolor = 'success';
    return this;
  }
  warning() {
    this.toast.bgcolor = 'warning';
    return this;
  }
  info() {
    this.toast.bgcolor = 'info';
    return this;
  }
  error() {
    this.toast.bgcolor = 'error';
    return this;
  }
  showSimple(message: string) {
    this.toast.message = message;
    return this.show(this.toast);
  }

  show(toast: IToast = {}) {
    this.mountIfNotMounted();

    this.toast = Object.assign(this.toast, toast);
    this.toast.show = true;
    if (this.toast.type) {
      this[this.toast.type]();
    }
    return new Promise((resolve, reject) => {
      this.toast.id = 'toast.' + Date.now();
      this.toast.resolve = resolve;
      this.toast.reject = reject;
      this.$root.ctx.commit(this.toast);
      setTimeout(() => {
        this.close();
      }, this.toast.timeout);
    });
  }
  close() {
    if (this.mounted === true) {
      const element = document.getElementById('lr--toast');
      element?.remove();
      this.mounted = false;
    }
  }
  destroy() {
    this.close();
  }
}

export const ToastPlugin: Plugin = {
  install(app: App, options: IToast) {
    const instance = new Toast(options);
    app.config.globalProperties.toast = instance;
    app.provide('toast', instance);
  }
};

export default ToastPlugin;
