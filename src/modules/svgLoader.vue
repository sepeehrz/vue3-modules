<template>
  <div class="Lr--svg__loader">
    <component
      :is="icon"
      :class="name + '-icon'"
      :width="size"
      :style="{fill: color, stroke: stroke}"></component>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  export default defineComponent({
    name: 'svgLoader'
  });
</script>

<script lang="ts" setup>
  import {computed, defineAsyncComponent} from 'vue';
  interface Props {
    name: any;
    size?: any;
    color?: any;
    stroke?: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    size: '24',
    color: '',
    stroke: ''
  });
  const icon = computed(() => {
    return defineAsyncComponent(
      () => import(`../assets/svg/${props.name}.svg`)
    );
  });
</script>
<style lang="scss" scoped>
  .Lr--svg__loader {
    display: inline-flex;
  }
</style>
