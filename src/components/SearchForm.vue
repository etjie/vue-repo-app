<template>
  <div>
    <alert :message="alert.message" :alert="alert.alert" :visible="alert.visible" />
    <form @submit.prevent="handleSubmit()">
      <div class="form-group form-row">
        <div class="col-12">
          <label for="username">
            <strong>GitHub Username:</strong>
          </label>
        </div>
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
            placeholder="username"
          />
        </div>
        <div class="col-3">
          <button type="submit" class="btn btn-primary btn-block">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Alert from "./Alert";

export default {
  name: "search-form",
  components: {
    Alert
  },
  data() {
    return {
      username: null,
      alert: {
        message: null,
        alert: null,
        visible: false
      }
    };
  },
  methods: {
    handleSubmit: function() {
      if (this.username) {
        console.log(this.username);
      } else {
        this.alert = {
          message: "Please fill in username",
          alert: "danger",
          visible: true
        };
      }
    }
  }
};
</script>

<style scoped>
</style>
