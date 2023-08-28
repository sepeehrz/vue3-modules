<template>
  <div
    v-for="(row, sectionIndex) in formData"
    :key="sectionIndex"
    class="Lr--form__section">
    <template v-if="!row.hide">
      <h3 v-if="row.title">{{ row.title }}</h3>
      <div class="Lr--form__field">
        <template v-for="(field, fieldIndex) in row.rows">
          <div
            v-if="!field.hide"
            class="Lr--form__field--item"
            :class="`Lr--form__field--item__${field.column || 2}`">
            <component
              :is="field.type"
              :key="fieldIndex"
              v-model="model[field.model]"
              :name="field.model"
              :field="field"
              @update:modelValue="change_field(field)" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import TextField from './forms/TextField.vue';
  import TextArea from './forms/TextArea.vue';
  import FormSelect from './forms/Select.vue';
  import DatePicker from './forms/DatePicker.vue';
  import AutoComplete from './forms/AutoComplete.vue';
  import CheckBox from './forms/CheckBox.vue';
  import Switch from './forms/Switch.vue';
  import Currency from './forms/Currency.vue';
  export default defineComponent({
    name: 'FormItems',
    components: {
      TextField,
      TextArea,
      FormSelect,
      DatePicker,
      AutoComplete,
      Switch,
      CheckBox,
      Currency
    }
  });
</script>

<script lang="ts" setup>
  import {IField} from './types/dataTypes';
  import {useModel} from '@dashboard/ui';
  const props = defineProps({
    formData: {type: Object, required: true},
    modelValue: {required: true}
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: any): void;
  }>();

  const {model} = useModel(props, emits);
  function change_field(field: IField) {
    if (field.onChange) {
      field.onChange(model.value[field.model]);
    }
  }
</script>
<style lang="scss">
  .Lr--form__section {
    h3 {
      display: block;
      font-size: 14px;
      font-weight: 500;
      padding-bottom: 30px;
      color: #464457;
    }

    .Lr--form__field {
      display: flex;
      flex-wrap: wrap;
      margin: 1rem 0;

      .Lr--form__field--item {
        margin-bottom: 46px;
        margin-left: 2%;

        &.Lr--form__field--item__1 {
          width: calc(20% - 2%);
        }

        &.Lr--form__field--item__2 {
          width: calc(25% - 2%);
        }

        &.Lr--form__field--item__3 {
          width: calc(37.5% - 2%);
        }

        &.Lr--form__field--item__4 {
          width: calc(50% - 2%);
        }

        &.Lr--form__field--item__5 {
          width: calc(75% - 2%);
        }

        &.Lr--form__field--item__6 {
          width: calc(100% - 2%);
        }
      }
    }
  }
</style>
