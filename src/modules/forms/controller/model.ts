import {computed} from 'vue';

export function useModel(props: any, emits: any) {
  const model = computed({
    get() {
      if (!props.modelValue) {
        return;
      }
      return props.modelValue;
    },
    set(value: any) {
      emits('update:modelValue', value);
    }
  });
  return {model};
}
