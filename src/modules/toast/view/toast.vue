<template>
  <transition name="fade">
    <div
      v-if="toast.show"
      class="v-toast"
      :class="getPositions"
      :style="{
        backgroundColor: colors[toast.bgcolor]
          ? colors[toast.bgcolor]
          : toast.bgcolor,
        color: colors[toast.color] ? colors[toast.color] : toast.color
      }">
      <div class="v-toast-text">
        {{ toast.message }}
        <i
          class="las la-times"
          :class="getPositions"
          :style="{
            color: colors[toast.color] ? colors[toast.color] : toast.color
          }"
          @click="close"></i>
      </div>
      <div v-if="toast.haveClose" class="v-toast-icon" @click="close">
        <svg
          viewPort="0 0 12 12"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2" />
          <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2" />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      msg: String
    },
    data() {
      return {
        colors: {
          error: '#FF1744',
          warning: '#ffc107',
          success: '#28a745',
          info: '#17a2b8'
        },
        toast: {}
      };
    },
    computed: {
      getPositions() {
        const position = ['top', 'bottom', 'left', 'right', 'center'];
        let filteredClass = position.filter(item => {
          for (let key of Object.keys(this.toast)) {
            if (key == item) {
              return item;
            }
          }
        });
        if (
          !filteredClass.includes('center') &&
          !filteredClass.includes('left') &&
          !filteredClass.includes('right') &&
          filteredClass.length
        ) {
          filteredClass.push('center');
        }
        if (filteredClass.length == 0) {
          filteredClass = ['bottom', 'center'];
        }
        filteredClass = filteredClass.map(item => {
          return 'v-toast-' + item;
        });
        return filteredClass;
      }
    },
    watch: {
      toast: {
        handler: function (value) {
          if (!value.show) {
          }
        },
        deep: true
      }
    },

    methods: {
      commit(toast) {
        this.toast = toast;
      },
      close() {
        this.toast.show = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .v-toast {
    position: fixed;
    height: 50px;
    min-width: 250px;
    max-width: 800px;
    white-space: nowrap;
    overflow: hidden;
    direction: rtl;
    text-overflow: ellipsis;
    line-height: 50px;
    padding: 0 10px;
    color: #fff;
    background-color: #000;
    border-radius: 7px;

    &-top {
      top: 10px;
    }

    &-bottom {
      bottom: 10px;
    }

    &-right {
      right: 10px;
    }

    &-left {
      left: 10px;
    }

    &-center {
      left: 50%;
      transform: translateX(-50%);
    }

    &-icon {
      position: absolute;
      left: 10px;
      top: 5px;
    }

    .v-toast-text {
      display: flex;
      align-items: center;

      i {
        padding-right: 30px;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }
</style>
