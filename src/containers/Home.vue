<template>
  <div class="d-flex align-items-center form-container">
    <div class="row justify-content-center w-100">
      <div class="col-md-6 text-left">
        <search-form @fetchData="fetchProfileAndRepo"></search-form>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "./../components/SearchForm";

export default {
  name: "home",
  components: {
    SearchForm
  },
  methods: {
    fetchProfileAndRepo: function(username) {
      this.$emit("fetchData", username);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  height: calc(100vh - 260px);
}
</style>
