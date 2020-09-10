window.$docsify = {
  repo: 'lollipop-onl/vuex-typesafe-helper',
  name: '@lollipop-onl/vuex-typesafe-helper',
  logo: './assets/logo.svg',
  themeColor: '#2661B9',
  loadNavbar: true,
  loadSidebar: true,
  subMaxLevel: 3,
  plugins: [
    EditOnGithubPlugin.create(
      'https://github.com/lollipop-onl/docs.lollipop.onl/edit/main/@lollipop-onl/vuex-typesafe-helper/',
      null,
      'GitHubで編集リクエストを送る'  
    ),
  ],
  ga: 'UA-158121040-5',
};
