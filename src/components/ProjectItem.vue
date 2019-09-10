<template>
  <div class="row">
    <div class="col">
      <h3 class="d-inline-block mr-2">
        <a href="#" @click.prevent="gotoDetail(data.name)">
          {{ data.name }}
        </a>
      </h3>
      <div class="d-inline-block repo-summary">
        <span class="badge badge-pill badge-primary ml-2">{{ data.language }}</span>
        <span class="badge badge-pill badge-danger ml-2">Open Issues ({{ data.open_issues_count }})</span>
        <span class="badge badge-pill badge-success ml-2">Watchers ({{ data.watchers_count }})</span>
        <span class="badge badge-pill badge-warning ml-2">Stars ({{ data.stargazers_count }})</span>
        <span class="badge badge-pill badge-info ml-2">Forks ({{ data.forks_count }})</span>
      </div>
      <div v-if="data.description" class="mb-2">
        <em>{{ data.description }}</em>
      </div>
      <div>
        <div class="form-inline">
          <div class="form-group">
            <label for="clone" class="mr-2">
              <small>GitHub URL:</small>
            </label>
            <a :href="data.html_url" target="_blank">{{ data.html_url }}</a>
          </div>
        </div>
      </div>
      <div>
        <small>
          <em>Created at:</em>
          <strong>{{ data.created_at | formatTime }}</strong>
          -
          <em>Last update:</em>
          <strong>{{ data.updated_at | formatTime }}</strong>
        </small>
      </div>
    </div>
    <div class="col-2 text-right">
      <button @click.prevent="gotoDetail(data.name)" class="btn btn-primary btn-sm mt-2">View README</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "project-item",
  methods: {
    gotoDetail: function(repo) {
      this.$router.push({ path: `/${this.user.login}/${repo}` });
    }
  },
  props: {
    data: Object,
    user: Object
  },
  filters: {
    formatTime: function(val) {
      return moment(val).format("MMM D, YYYY");
    }
  }
};
</script>

<style scoped>
.repo-summary {
  position: relative;
  display: inline-block;
  top: -4px;
}
</style>
