<template>
  <FormTextField
    v-model="displayValue"
    @click="show = true"
    :id="id"
    :label="label"
    icon="calendar"
    :placeholder="placeholder"
    :disabled="disabled" />
  <date-picker
    ref="datePicker"
    :show="show"
    v-model="model"
    @close="show = false"
    :auto-submit="true"
    :element="id"
    :format="format"
    :disabled="disabled"></date-picker>
</template>

<script lang="ts">
  import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormDatePicker',
    components: {datePicker: VuePersianDatetimePicker},
    inheritAttrs: false
  });
</script>
<script lang="ts" setup>
  // @ts-ignore
  import moment from 'moment-jalaali';
  import {useModel} from './controller/model';
  import {ref, computed, watch} from 'vue';

  interface Props {
    modelValue: string;
    label?: string;
    format?: string;
    displayFormat?: string;
    placeholder?: string;
    disabled?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    format: 'YYYY-MM-DD',
    displayFormat: 'jYYYY/jMM/jDD'
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const show = ref(false);

  const displayValue = ref(
    props.modelValue
      ? moment(props.modelValue, [props.format]).format(props.displayFormat)
      : ''
  );

  const {model} = useModel(props, emits);

  watch(
    () => props.modelValue,
    value => {
      if (value.length !== 0) {
        displayValue.value = moment(value, [props.format]).format(
          props.displayFormat
        );
      }
    },
    {immediate: true}
  );
  const id = computed(() => {
    return `datepicker_${new Date().getMilliseconds()}`;
  });
</script>
<style lang="scss" scoped>
  ::v-deep(.vpd-container) {
    .vpd-content {
      border-radius: 10px;
      background-color: #e9ecef;
      .vpd-header {
        background-color: #e9ecef !important;
        border-radius: 10px 10px 0 0;
        color: #000;
      }
    }
  }
</style>
