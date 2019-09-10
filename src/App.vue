<template>
  <div id="app">
    <notifications position="top center" class="notif" />
    <navbar></navbar>
    <div class="container py-2">
      <div class="card border-0 shadow my-5">
        <div class="card-body p-5">
          <router-view @fetchData="fetchProfileAndRepo"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    Navbar
  },
  methods: {
    fetchProfileAndRepo: async function(username) {
      this.$store.dispatch("updateLoadingAction", true);
      await this.$http
        .all([
          this.$http.get(`https://api.github.com/users/${username}`),
          this.$http.get(`https://api.github.com/users/${username}/repos`)
        ])
        .then(
          this.$http.spread((responseOne, responseTwo) => {
            this.$store.dispatch("updateProfileAction", responseOne.data);
            this.$store.dispatch("updateRepoAction", responseTwo.data);
            if (this.$route.path === "/") {
              this.$router.push({ path: `/${username}` });
            }
          })
        )
        .catch(error => {
          this.$store.dispatch("updateErrorAction", true);
          this.$notify({
            type: "error",
            title: error,
            text: error.response.data.message
          });
        })
        .finally(() => {
          this.$store.dispatch("updateLoadingAction", false);
        });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 56px;
  background: url('./assets/photo-1500964757637-c85e8a162699.jpeg') no-repeat
    center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  min-height: calc(100vh - 56px);
  & > .container {
    .card {
      min-height: calc(100vh - 160px);
    }
    .h-100 {
      min-height: 100%;
    }
  }
  .notif {
    top: 20px !important;
  }
  .list-group-item:last-child {
    margin-bottom: 0 !important;
  }
}
</style>
