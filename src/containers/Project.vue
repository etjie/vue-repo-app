<template>
    <div>
        <div class="align-items-center mb-5">
            <div class="mb-3">
                <img :src="profile.avatar_url" class="avatar rounded-circle" alt="profile.name">
            </div>
            <h4>{{ profile.name }}'s Project</h4>
        </div>
        <ul class="text-left list-group">
            <li v-for="(item, index) in repo" :key="item.id" class="list-group-item mb-4">
                <div class="row">
                    <div class="col">
                        <h3 class="d-inline-block mr-2">
                            <a :href="item.html_url" target="_blank">
                                <strong>{{ item.name }}</strong>
                            </a>
                        </h3>
                        <div class="d-inline-block repo-summary">
                            <span class="badge badge-pill badge-primary ml-2">{{ item.language }}</span>
                            <span class="badge badge-pill badge-danger ml-2">Open Issues ({{ item.open_issues_count }})</span>
                            <span class="badge badge-pill badge-success ml-2">Watchers ({{ item.watchers_count }})</span>
                            <span class="badge badge-pill badge-warning ml-2">Stars ({{ item.stargazers_count }})</span>
                            <span class="badge badge-pill badge-info ml-2">Forks ({{ item.forks_count }})</span>
                        </div>
                        <div v-if="item.description" class="mb-2">
                            <em>{{ item.description }}</em>
                        </div>
                        <div>
                            <div class="form-inline">
                                <div class="form-group">
                                    <label for="clone" class="mr-2"><small>GitHub URL:</small></label>
                                    <a :href="item.html_url" target="_blank">{{ item.html_url }}</a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <small>
                                <em>Created at: </em> <strong>{{ item.created_at | formatTime }}</strong>
                                - <em>Last update: </em> <strong>{{ item.updated_at | formatTime }}</strong>
                            </small>
                        </div>
                    </div>
                    <div class="col-2 text-right">
                        <button @click="gotoDetail" class="btn btn-primary btn-sm mt-2">View README</button>
                    </div>
                </div>
                
                <!-- <pre>{{ item }}</pre> -->
            </li>
        </ul>
        <!-- <pre>{{ repo }}</pre> -->
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "project",
  data() {
    return {
      loading: false,
      error: false,
    };
  },
  mounted () {
    const repo = this.$store.getters.repo || null
    const username = this.$route.params.username || null
    if (!repo) {
        // this.fetchRepos(this.username)
        console.log(username)
        this.$emit('fetchData', username)
    }
  },
  methods: {
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
    },
  },
  computed: {
    repo: function() {
      return this.$store.getters.repo
    },
    profile: function () {
      return this.$store.getters.profile
    }
  },
  filters: {
      formatTime: function(val) {
          return moment(val).format('MMM D, YYYY')
      }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 100px
}
#clone {
    min-width: 400px;
}
.repo-summary {
    position: relative;
    display: inline-block;
    top: -4px;
}
</style>
