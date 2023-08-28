export interface IDialog {
  type?: 'warning' | 'info' | 'question' | 'success' | 'error';
  icon?: string;
  title?: string;
  message?: string;
  ok_txt?: string;
  cancel_txt?: string;
  prompt?: string;
  container_custom_class?: string;
  dialog_wrapper_custom_class?: string;
  persistent?: boolean;
  props?: any;
  scope?: any;
  component?: any;
  resolve?: any;
  reject?: any;
  destroy?: any;
  id?: string;
  wrapper?: any;
}
