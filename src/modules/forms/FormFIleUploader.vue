<template>
  <div>
    <file-pond
      name="file"
      ref="pond"
      :label-idle="label"
      :server="server"
      :allow-multiple="multiple"
      @processfile="handleFilePondInit" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'FormFileUploader'
  });
</script>
<script lang="ts" setup>
  import {useUserStore} from '../../../../../module/auth/src/controller/storage/userStore';

  interface Props {
    modelValue: string | number;
    api: string;
    multiple?: boolean;
    label?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    api: '/api/Files'
  });
  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
    (e: 'getServerId', items: string): void;
  }>();

  const store = useUserStore();
  const server = {
    url: getApiUrl(),
    timeout: 7000,
    process: {
      url: props.api,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${store.getToken}`,
        'accept-language': 'fa'
      },
      withCredentials: false
    }
  };

  function handleFilePondInit(err: any, file: any) {
    console.log(file);
    let parsedData = JSON.parse(file.serverId);
    console.log(parsedData.data.id);
    emits('update:modelValue', parsedData.data.id);
  }
  function getApiUrl() {
    if (window.location.host === 'admin.lendroll.ir') {
      return 'https://admin.api.lendroll.ir/api';
    } else if (window.location.host === 'org.lendroll.ir') {
      return 'https://org.api.lendroll.ir/api';
    } else if (window.location.host === 'emp.lendroll.ir') {
      return 'https://emp.api.lendroll.ir/api';
    } else {
      return 'https://test.api.lendroll.ir/api';
    }
  }
</script>
<style lang="scss" scoped></style>
