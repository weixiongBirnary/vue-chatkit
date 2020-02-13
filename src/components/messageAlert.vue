<template>
  <div class="alertlist">
    <!-- <b-button @click="shiftAlert">删除信息</b-button> -->
    <transition-group
      name="alertgroup"
      enter-active-class="animated fadeInRight delay-2s"
      leave-active-class="animated fadeOutRight delay-3s"
      @after-enter="afterEnter"
    >
      <b-alert
        v-for="( alert ) in alertList"
        :key="alert.id"
        :variant="alert.variant"
        :show="alertLen"
        @mouseenter="enterAlert"
        @click="deleteThisAlert(index)"
      >{{ alert.value }}</b-alert>
    </transition-group>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import style from "../assets/css/animate.css";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["alertList"]),
    alertLen() {
      return this.alertList.length > 0;
    }
  },
  methods: {
    ...mapMutations(["shiftAlert"]),
    afterEnter() {
      setInterval(this.shiftAlert, 5 * 1000);
    },
    enterAlert() {
      // eslint-disable-next-line no-console
      console.log("focus", new Date());
    },
    deleteThisAlert(index) {
        // eslint-disable-next-line no-console
        console.log('alertIndex',index);
      this.shiftAlert(index);
    }
  }
};
</script>

<style>
.alertlist {
  position: absolute;
  right: 0;
  top: 5rem;
  z-index: 999;
}
</style>