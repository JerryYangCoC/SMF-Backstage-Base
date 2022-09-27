<template>
  <div
    class="select-container"
    style="width: 100%; position: relative"
    ref="target"
  >
    <div
      class="d-flex justify-content-end align-items-center"
      style="
        border: 1px solid #c4c4c4;
        border-radius: 10px;
        padding: 0 14px;
        height: 40px;
      "
      @click="autoShow = !autoShow"
    >
      <span class="flex-fill text-start">
        {{ selectValue }}
      </span>
      <img src="../assets/selection-arrow.png" alt="searchImg" />
    </div>
    <div
      class="auto-complicate-div text-start"
      style='width: 100%'
      :style="`max-height:${mxHeight}px;top:${topSide}px`"
      v-show="autoShow"
      @mouseenter="autoShow = true"
    >
      <p
        v-for="(value, index) in valueArr"
        :key="index"
        class="
          m-0
          auto-complicate-p
          d-flex
          justify-content-end
          align-items-center
        "
        style="padding: 5px 14px"
        @click="childClick(value, index)"
      >
        <span class="flex-fill" v-if="Object.prototype.toString.call(valueArr)==='[object Object]'">
          {{ index }}
        </span>
        <span class="flex-fill" v-else>
          {{ value }}
        </span>
        <span style="width: 10px">&nbsp;</span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "Dropdown",
  components: {},
  props: {
    topSide:Number,
    mxHeight:Number,
    valueArr:[Array,Object],
    selectValue: String,
    changingSelected: String,
  },
  setup() {
    const autoShow = ref(false);
    const target = ref(null);

    onClickOutside(target, () => (autoShow.value = false));

    return {
      target,
      autoShow,
    };
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    childClick(value, index) {
      this.$emit(
        "selectValueByDrop",
        value,
        this.$props.changingSelected,
        index
      );
      this.autoShow = false;
    },
  },
};
</script>

<style scoped>
.auto-complicate-div {
  position: absolute;
  box-shadow: none;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  background-color: white;
  z-index: 99;
  max-height: 200px;
  overflow: auto;
}
.select-container {
  color:   #575757;
  text-align: center;
  cursor: default;
}
.auto-complicate-p {
  color:  #575757
}
.auto-complicate-p:hover {
  background-color: #eaf3f4;
  color: #575757
}
</style>