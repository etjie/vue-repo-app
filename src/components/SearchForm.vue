<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      <div class="form-group form-row">
        <div class="col-12">
          <label for="username">
            <strong>GitHub Username:</strong>
          </label>
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            :class="[error ? 'is-invalid' : '']"
            id="username"
            v-model="username"
            placeholder="username"
            @focus="onFocus"
          />
        </div>
        <div class="col-4">
          <template v-if="loading">
            <button class="btn btn-primary btn-block" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          </template>
          <template v-else>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "search-form",
  data() {
    return {
      username: null
    };
  },
  mounted: function() {
    this.$store.dispatch("updateErrorAction", false);
  },
  methods: {
    onFocus: function() {
      this.$store.dispatch('updateErrorAction', false)
    },
    handleSubmit: function() {
      if (this.username) {
        this.$emit("fetchData", this.username);
      } else {
        this.$store.dispatch('updateErrorAction', true)
        this.$notify({
          type: "error",
          title: "Oops! Something went wrong.",
          text: "Username is not valid or empty. Please check username again."
        });
      }
    }
  },
  computed: {
    repo: function() {
      return this.$store.getters.repo;
    },
    profile: function() {
      return this.$store.getters.profile;
    },
    loading: function() {
      return this.$store.getters.loading;
    },
    error: function() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style scoped>
</style>
