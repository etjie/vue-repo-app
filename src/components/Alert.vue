<template>
  <div>
    <div class="alert alert-dismissible fade" :class="[alertClass, isShow]" role="alert">
      {{ message }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "alert",
  props: {
    message: String,
    alert: String,
    visible: Boolean
  },
  computed: {
    alertClass: function() {
      return `alert-${this.alert}`;
    },
    isShow: function() {
      return this.visible ? "show" : "";
    }
  }
};
</script>

<style scoped></style>
