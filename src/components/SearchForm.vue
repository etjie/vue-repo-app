<template>
  <div>
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
            :class="[error ? 'is-invalid' : '']"
            id="username"
            v-model="username"
            placeholder="username"
            @focus="onFocus"
          />
        </div>
        <div class="col-3">
          <template v-if="loading">
            <button type="submit" class="btn btn-primary btn-block" disabled aria-disabled="true">Submit</button>
          </template>
          <template v-else>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
          </template>
        </div>
      </div>
    </form>
    {{ repo }}
  </div>
</template>

<script>

export default {
  name: "search-form",
  data() {
    return {
      username: null,
      loading: false,
      error: false,
    };
  },
  methods: {
    onFocus: function() {
      this.error = false;
    },
    handleSubmit: function() {
      if (this.username) {
        this.fetchProfileAndRepo(this.username);
      } else {
        this.error = true
        this.$notify({
          type: 'error',
          title: 'Oops! Something went wrong.',
          text: 'Username is not valid or empty. Please check username again.'
        });
      }
    },
    fetchProfileAndRepo: async function(username) {
      this.loading = true;
      await this.$http.all([
          this.$http.get(`https://api.github.com/users/${username}`),
          this.$http.get(`https://api.github.com/users/${username}/repos`),
        ])
        .then(this.$http.spread((responseOne, responseTwo) => {
          this.$store.dispatch('updateProfileAction', responseOne.data)
          this.$store.dispatch('updateRepoAction', responseTwo.data)
          this.$router.push({ path: `/${username}` })
        }))
        .catch(error => {
          this.error = true
          this.$notify({
            type: 'error',
            title: error,
            text: error.response.data.message
          });
        })
        .finally(() => {
          this.loading = false
          this.error = false
        })
    }
  },
  computed: {
    repo: function() {
      return this.$store.getters.repo
    },
    profile: function () {
      return this.$store.getters.profile
    }
  }
};
</script>

<style scoped>
</style>
