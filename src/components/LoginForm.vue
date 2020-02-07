<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr />
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>

      <b-form-group id="userInputGroup" label="User Name" label-for="userInput">
        <b-form-input
          id="userInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        block
        type="submit"
        variant="primary"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid"
      >
        Login
        <div class="ld ld-ring ld-spin"></div>
      </b-button>
      <b-button
        block
        @click="createUser"
        :class="loading"
      >
      Create
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "login-form",
  data() {
    return {
      userId: ""
    };
  },
  computed: {
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions(["login"]),
    async onSubmit() {
      // eslint-disable-next-line no-unused-vars
      const result = await this.login(this.userId).then(data => {
        // eslint-disable-next-line no-console
        console.log("result", data);
        if (data) {
          this.$router.push("chat");
        }
      });
      // eslint-disable-next-line no-console
      // console.log('result',result);
    },
    createUser() {
      this.$router.push("createuser");
    }
  }
};
</script>
