<template>
  <div class="Lr--form__wrapper">
    <slot name="formHeader">
      <div class="Lr--form__header">
        <div class="Lr--form__title">
          <h3>{{ title }}</h3>
          <slot name="formMoreTitle"></slot>
        </div>
        <div class="Lr--form__actions">
          <slot name="moreActionHeader"></slot>
          <button class="Lr--form__back" @click="back">
            <svgLoader
              name="chevron_right"
              stroke="#ced4da"
              class="form-back__icon"
              size="18" />
            بازگشت
          </button>
          <button class="Lr--form__save" @click="save" v-if="withSave">
            <svgLoader
              name="chevron_right"
              stroke="#0d6efd"
              class="form-save__icon"
              size="18" />
            ذخیره
          </button>
        </div>
      </div>
    </slot>
    <slot name="formSubHeader"></slot>
    <div class="Lr--form__items">
      <FormItems v-model="initialData" :form-data="formData" />
    </div>
    <slot name="extra-form"></slot>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormGenerator'
  });
</script>

<script lang="ts" setup>
  import {ref, watch, inject} from 'vue';
  import FormItems from './form-items.vue';
  import {useRouter} from 'vue-router';
  import {validations} from '@dashboard/utils';
  import {RequestAxiosResource} from '@dashboard/utils';

  interface Props {
    formData: object;
    items: any;
    title?: string;
    service: RequestAxiosResource;
    modelValue?: any;
    backUrl?: string;
    saveUrl?: string;
    withSave?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    formData: () => [],
    items: () => [],
    withSave: true
  });

  const $router = useRouter();
  const initialData = ref(props.items);
  const $validator = validations();
  const $toast: any = inject('toast');

  const emits = defineEmits<{
    (e: 'update:modelValue', items: any): void;
  }>();
  watch(
    () => props.items,
    value => {
      initialData.value = value;
    }
  );
  watch(
    () => initialData.value,
    value => {
      emits('update:modelValue', value);
    },
    {deep: true}
  );

  function save() {
    $validator
      .validateAll(props.formData, initialData.value)
      .then((data: any) => {
        if (data.length === 0) {
          let result;

          if (initialData.value.id) {
            result = props.service.$update(
              initialData.value.id,
              initialData.value
            );
          } else {
            result = props.service.$save(initialData.value);
          }
          result.then((data: any) => {
            if (data.status === 200) {
              $toast
                .bgcolor('#bfddcf')
                .color('#198754')
                .left()
                .bottom()
                .showSimple(data.data.message);
              saveUrl();
            } else {
              $toast
                .bgcolor('#f5c6cb')
                .color('#DC3545')
                .left()
                .bottom()
                .showSimple(
                  data.data.message ||
                    'خطایی رخ داده است لطفا مجدد تلاش کنید یا به ادمین پنل پیام دهید'
                );
            }
          });
        } else {
          $toast
            .bgcolor('#f5c6cb')
            .color('#DC3545')
            .left()
            .bottom()
            .showSimple(
              'فیلد های فرم به صورت صحیح پر نشده است لطفا مجددا بررسی فرمایید'
            );
        }
      });
  }
  function back() {
    if (props.backUrl) {
      $router.push(props.backUrl);
    } else {
      $router.go(-1);
    }
  }
  function saveUrl() {
    if (props.saveUrl) {
      $router.push(props.saveUrl);
    } else {
      $router.go(-1);
    }
  }
</script>
<style lang="scss" scoped>
  .Lr--form__wrapper {
    .Lr--form__items {
      margin-top: 50px;
    }

    .Lr--form__header {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 10;
      border-bottom: 1px solid #80bdff;

      .Lr--form__title {
        display: flex;
        align-items: center;

        h3 {
          font-size: 16px;
          color: #000;
        }
      }

      .Lr--form__actions {
        display: flex;

        .Lr--form__save {
          width: 100px;
          height: 40px;
          background-color: #0d6efd;
          color: #fff;
          border: 1px solid #0d6efd;
          border-radius: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          .form-save__icon {
            background-color: #fff;
            margin-left: 8px;
            border-radius: 4px;
            transform: rotate(-180deg);
          }
        }

        .Lr--form__back {
          @extend .Lr--form__save;
          margin-left: 10px;
          background-color: #ced4da;
          border: 1px solid #ced4da;
          color: #212529;

          .form-back__icon {
            color: #ced4da;
            background-color: #212529;
            border-radius: 4px;
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
