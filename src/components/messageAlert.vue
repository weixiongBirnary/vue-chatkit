<template>
  <div class="alertlist">
    <!-- <b-button @click="shiftAlert">删除信息</b-button> -->
    <transition-group
      name="alertgroup"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
      
    >
      <b-alert
        v-for="( alert ) in alertList"
        :key="alert.id"
        :variant="alert.variant"
        :show="alertLen"
        v-deleteThisAlert:[directivesArg]="{ fun: shiftAlert, time: 5}"
        v-focusThisAlert="focusAlert"
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
    return {
      directivesArg: 'delete'
    };
  },
  directives: {
    deleteThisAlert: {
      // eslint-disable-next-line no-unused-vars
      inserted: function(el, binding){
        const { fun, time } = binding.value;
        const arg = binding.arg;
        if(arg == 'delete') {
          setInterval(fun, time * 1000)
        }
        
      }
    },
    focusThisAlert: {
      // eslint-disable-next-line no-unused-vars
      inserted: function(el, binding) {
        const fun = binding.value;
        el.onmouseenter = fun;
      }
    },
    dbClickThisAlert: {
      inserted: function(el, binding) {
        const fun = binding.value;
        el.ondblclick = fun;
      }
    }
  },
  computed: {
    ...mapState(["alertList"]),
    alertLen() {
      return this.alertList.length > 0;
    }
  },
  methods: {
    ...mapMutations(["shiftAlert"]),
    focusAlert() {
      this.directivesArg = 'focus'
      // eslint-disable-next-line no-console
      console.log("focus", this.directivesArg);
    },
    deleteThisAlert(index) {
      // eslint-disable-next-line no-console
      console.log('alertIndex',index);
      // this.shiftAlert(index);
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