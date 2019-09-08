<template>
  <div class="container py-2">
    <div class="card border-0 shadow mt-5">
      <div class="card-body p-5">
        <div class="d-flex h-100 align-items-center">
          <div class="row justify-content-center w-100">
            <div class="col-md-6 text-left">
              <search-form></search-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from './../components/SearchForm'

export default {
  name: "home",
  components: {
    SearchForm
  }
};
</script>

<style lang="scss" scoped>
.container {
  .card {
    height: calc(100vh - 160px);
  }
  .h-100 {
    min-height: 100%;
  }
}
</style>
