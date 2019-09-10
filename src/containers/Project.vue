<template>
  <div>
    <template v-if="loading">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </template>
    <template v-else>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ profile.login }}</li>
        </ol>
      </nav>
      <template v-if="profile">
        <div class="jumbotron jumbotron-fluid">
          <div class="mb-3">
            <img :src="profile.avatar_url" class="avatar rounded-circle" alt="profile.name" />
          </div>
          <h3>{{ profile.name || profile.login }}'s Project</h3>
          <div>
            <a :href="profile.html_url" target="_blank">{{ profile.html_url }}</a>
          </div>
        </div>
      </template>
      <ul class="text-left list-group">
        <li v-for="item in repo" :key="item.id" class="list-group-item mb-4">
          <project-item :data="item" :user="profile"></project-item>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import ProjectItem from "./../components/ProjectItem";

export default {
  name: "project",
  components: {
    ProjectItem
  },
  data() {
    return {};
  },
  mounted() {
    const repo = this.$store.getters.repo || null;
    const username = this.$route.params.username || null;
    if (!repo) {
      this.$emit("fetchData", username);
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

<style lang="scss" scoped>
.avatar {
  width: 100px;
}
</style>
