<template>
  <div>
    <b-navbar id="create-navbar" type="dark" variant="info">
      <b-navbar-brand>注册用户</b-navbar-brand>
    </b-navbar>
    <b-form @click.prevent="onsubmit">
      <b-container fluid>
        <b-row v-for="type in types" :key="type.type" class="my-1">
          <b-col sm="3">
            <label :for="`type-${type.type}`">
              <code>{{ type.name }}:</code>
            </label>
          </b-col>
          <b-col sm="9">
            <b-form-input :id="`type-${type.type}`" :type="type.type" v-model="type.value"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="createuser-btn">
          <b-col lg="6" class="pd-2">
            <b-button variant="success" type="submit">注册</b-button>
          </b-col>
          <b-col lg="6" class="pd-2">
            <b-button variant="danger" @click="jumpToFirstPage">返回</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      ...mapState(["sending"]),
      types: [
        {
          name: "name",
          type: "text",
          value: ""
        },
        // "number",
        {
          name: "email",
          type: "email",
          value: ""
        },
        // "email",
        {
          name: "password",
          type: "password",
          value: ""
        },
        // "password",
        // "search",
        // "url",
        // "tel",
        {
          name: "phone",
          type: "tel",
          value: ""
        }
        // "date",
        // "time",
        // "range",
        // "color"
      ]
    };
  },
  methods: {
    jumpToFirstPage() {
      this.$router.push("/");
    },
    ...mapActions(["createUser", "login"]),
    async onsubmit() {
      const username = this.types[0].value;
      await this.createUser(username);
    //   await this.login(username).then(data => {
    //       // eslint-disable-next-line no-console
    //     console.log("result", data);
    //     if (data) {
    //       this.$router.push("chat");
    //     }
    //   });
      //   this.$router.push("/");
    }
  }
};
</script>

<style>
#create-navbar {
  margin-bottom: 15px;
}
.createuser-btn {
  margin-top: 25px;
}
</style>