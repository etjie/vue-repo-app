<template>
  <div class="text-left">
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
          <li class="breadcrumb-item">
            <router-link :to="`/${username}`">{{ username }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ reponame }}</li>
        </ol>
      </nav>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h2>
            <svg
              class="octicon octicon-repo"
              viewBox="0 0 12 16"
              version="1.1"
              width="12"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
              />
            </svg>
            {{ username }} / {{ reponame }}
          </h2>
        </div>
      </div>
      <template v-if="list">
        <ul class="list-group">
          <li class="list-group-item" v-for="item in list" :key="item.name">
            <file-item :data="item"></file-item>
          </li>
        </ul>
        <hr class="my-4" />
      </template>
      <div v-if="content" class="h4 mb-2">
        <svg
          class="octicon octicon-book mr-2"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
          />
        </svg>
        <strong>README.md</strong>
      </div>
      <div v-else class="mb-2">
        This project doesn't have
        <strong>README.md</strong> file.
      </div>
      <template v-if="content">
        <vue-markdown :source="content" id="wrapper"></vue-markdown>
      </template>
      <template v-else></template>
    </template>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import FileItem from "./../components/FileItem";

export default {
  name: "detail",
  components: {
    VueMarkdown,
    FileItem
  },
  data() {
    return {
      list: null,
      readme: null,
      content: null,
      url: null,
      username: this.$route.params.username || null,
      reponame: this.$route.params.repo || null
    };
  },
  mounted() {
    this.getFiles(this.username, this.reponame);
  },
  methods: {
    getFiles: async function(username, reponame) {
      this.$store.dispatch("updateLoadingAction", true);
      const url = `https://api.github.com/repos/${username}/${reponame}/contents/`;
      await this.$http
        .get(url)
        .then(response => {
          this.list = response.data;
        })
        .catch(error => {
          this.$notify({
            type: "error",
            title: error,
            text: error || null
          });
        })
        .finally(() => {
          this.$store.dispatch("updateLoadingAction", false);
          this.sortList();
          this.checkReadme();
        });
    },
    getContent: async function() {
      this.$store.dispatch("updateLoadingAction", true);
      await this.$http
        .get(this.url)
        .then(response => {
          this.content = response.data;
        })
        .catch(error => {
          this.$notify({
            type: "error",
            title: error,
            text: error
          });
        })
        .finally(() => {
          this.$store.dispatch("updateLoadingAction", false);
        });
    },
    checkReadme: function() {
      this.readme = this.list.find(obj => {
        return obj.name.toLowerCase() === "readme.md";
      });
      if (this.readme) {
        if (Object.keys(this.readme).length > 0) {
          this.url = this.readme.download_url;
          this.getContent();
        }
      }
    },
    sortList: function() {
      const array = Object.keys(this.list).map(key => {
        return this.list[key];
      });
      this.list = array.sort((a, b) => {
        const nameA = a.type.toUpperCase();
        const nameB = b.type.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
  },
  computed: {
    loading: function() {
      return this.$store.getters.loading;
    },
    error: function() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style lang="scss">
.octicon-file-directory {
  color: rgba(3, 47, 98, 0.5);
}
.octicon-file {
  color: rgba(3, 47, 98, 0.5);
}

// Markdown style
#wrapper {
  font: 15px helvetica, arial, freesans, clean, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.7;
  padding: 3px;
  background: #fff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #fff;
  padding: 30px;
  font-size: 15px;
  line-height: 1.6;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  p {
    margin: 1em 0;
  }

  a {
    color: #4183c4;
    text-decoration: none;
  }

  & > *:first-child {
    margin-top: 0 !important;
  }
  & > *:last-child {
    margin-bottom: 0 !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1.7;
    cursor: text;
    position: relative;
    margin: 1em 0 15px;
    padding: 0;
  }

  h1 {
    font-size: 2.5em;
    border-bottom: 1px solid #ddd;
  }

  h2 {
    font-size: 2em;
    border-bottom: 1px solid #eee;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.2em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    color: #777;
    font-size: 1em;
  }

  p,
  blockquote,
  table,
  pre {
    margin: 15px 0;
  }

  ul {
    padding-left: 30px;
  }

  ol {
    padding-left: 30px;
  }
  ol li ul:first-of-type {
    margin-top: 0px;
  }

  hr {
    background: transparent
      url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC)
      repeat-x 0 0;
    border: 0 none;
    color: #ccc;
    height: 4px;
    margin: 15px 0;
    padding: 0;
  }
  & > h2:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  & > h1:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  & > h1:first-child + h2 {
    margin-top: 0;
    padding-top: 0;
  }
  & > h3:first-child,
  & > h4:first-child,
  & > h5:first-child,
  & > h6:first-child {
    margin-top: 0;
    padding-top: 0;
  }
  a:first-child h1,
  a:first-child h2,
  a:first-child h3,
  a:first-child h4,
  a:first-child h5,
  a:first-child h6 {
    margin-top: 0;
    padding-top: 0;
  }

  h1 + p,
  h2 + p,
  h3 + p,
  h4 + p,
  h5 + p,
  h6 + p,
  ul li > :first-child,
  ol li > :first-child {
    margin-top: 0;
  }

  dl {
    padding: 0;
  }
  dl dt {
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    padding: 0;
    margin: 15px 0 5px;
  }
  dl dt:first-child {
    padding: 0;
  }
  dl dt > :first-child {
    margin-top: 0;
  }
  dl dt > :last-child {
    margin-bottom: 0;
  }
  dl dd {
    margin: 0 0 15px;
    padding: 0 15px;
  }
  dl dd > :first-child {
    margin-top: 0;
  }
  dl dd > :last-child {
    margin-bottom: 0;
  }

  blockquote {
    border-left: 4px solid #ddd;
    padding: 0 15px;
    color: #777;
  }
  blockquote > :first-child {
    margin-top: 0;
  }
  blockquote > :last-child {
    margin-bottom: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 100%;
    font: inherit;
  }
  table th {
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 6px 13px;
  }
  table td {
    border: 1px solid #ccc;
    padding: 6px 13px;
  }
  table tr {
    border-top: 1px solid #ccc;
    background-color: #fff;
  }
  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  img {
    max-width: 100%;
  }

  code,
  tt {
    margin: 0 2px;
    padding: 0 5px;
    white-space: nowrap;
    border: 1px solid #eaeaea;
    background-color: #f8f8f8;
    border-radius: 3px;
    font-family: Consolas, "Liberation Mono", Courier, monospace;
    font-size: 12px;
    color: #333333;
  }

  pre > code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent;
  }

  .highlight pre {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    font-size: 13px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
  }

  pre {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    font-size: 14px;
    line-height: 19px;
    overflow: auto;
    padding: 6px 10px;
    border-radius: 3px;
    margin: 26px 0;
  }
  pre code,
  pre tt {
    background-color: transparent;
    border: none;
  }

  .poetry pre {
    font-family: Georgia, Garamond, serif !important;
    font-style: italic;
    font-size: 110% !important;
    line-height: 1.6em;
    display: block;
    margin-left: 1em;
  }
  .poetry pre code {
    font-family: Georgia, Garamond, serif !important;
    word-break: break-all;
    word-break: break-word;
    /* Non standard for webkit */
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    white-space: pre-wrap;
  }

  sup,
  sub,
  a.footnote {
    font-size: 1.4ex;
    height: 0;
    line-height: 1;
    vertical-align: super;
    position: relative;
  }

  sub {
    vertical-align: sub;
    top: -1px;
  }

  .highlight .c {
    color: #998;
    font-style: italic;
  }
  .highlight .err {
    color: #a61717;
    background-color: #e3d2d2;
  }
  .highlight .k,
  .highlight .o {
    font-weight: bold;
  }
  .highlight .cm {
    color: #998;
    font-style: italic;
  }
  .highlight .cp {
    color: #999;
    font-weight: bold;
  }
  .highlight .c1 {
    color: #998;
    font-style: italic;
  }
  .highlight .cs {
    color: #999;
    font-weight: bold;
    font-style: italic;
  }
  .highlight .gd {
    color: #000;
    background-color: #fdd;
  }
  .highlight .gd .x {
    color: #000;
    background-color: #faa;
  }
  .highlight .ge {
    font-style: italic;
  }
  .highlight .gr {
    color: #a00;
  }
  .highlight .gh {
    color: #999;
  }
  .highlight .gi {
    color: #000;
    background-color: #dfd;
  }
  .highlight .gi .x {
    color: #000;
    background-color: #afa;
  }
  .highlight .go {
    color: #888;
  }
  .highlight .gp {
    color: #555;
  }
  .highlight .gs {
    font-weight: bold;
  }
  .highlight .gu {
    color: #800080;
    font-weight: bold;
  }
  .highlight .gt {
    color: #a00;
  }
  .highlight .kc,
  .highlight .kd,
  .highlight .kn,
  .highlight .kp,
  .highlight .kr {
    font-weight: bold;
  }
  .highlight .kt {
    color: #458;
    font-weight: bold;
  }
  .highlight .m {
    color: #099;
  }
  .highlight .s {
    color: #d14;
  }
  .highlight .na {
    color: #008080;
  }
  .highlight .nb {
    color: #0086b3;
  }
  .highlight .nc {
    color: #458;
    font-weight: bold;
  }
  .highlight .no {
    color: #008080;
  }
  .highlight .ni {
    color: #800080;
  }
  .highlight .ne,
  .highlight .nf {
    color: #900;
    font-weight: bold;
  }
  .highlight .nn {
    color: #555;
  }
  .highlight .nt {
    color: #000080;
  }
  .highlight .nv {
    color: #008080;
  }
  .highlight .ow {
    font-weight: bold;
  }
  .highlight .w {
    color: #bbb;
  }
  .highlight .mf,
  .highlight .mh,
  .highlight .mi,
  .highlight .mo {
    color: #099;
  }
  .highlight .sb,
  .highlight .sc,
  .highlight .sd,
  .highlight .s2,
  .highlight .se,
  .highlight .sh,
  .highlight .si,
  .highlight .sx {
    color: #d14;
  }
  .highlight .sr {
    color: #009926;
  }
  .highlight .s1 {
    color: #d14;
  }
  .highlight .ss {
    color: #990073;
  }
  .highlight .bp {
    color: #999;
  }
  .highlight .vc,
  .highlight .vg,
  .highlight .vi {
    color: #008080;
  }
  .highlight .il {
    color: #099;
  }
  .highlight .gc {
    color: #999;
    background-color: #eaf2f5;
  }

  .type-csharp .highlight .k,
  .type-csharp .highlight .kt {
    color: #00f;
  }
  .type-csharp .highlight .nf {
    color: #000;
    font-weight: normal;
  }
  .type-csharp .highlight .nc {
    color: #2b91af;
  }
  .type-csharp .highlight .nn {
    color: #000;
  }
  .type-csharp .highlight .s,
  .type-csharp .highlight .sc {
    color: #a31515;
  }
}
</style>
