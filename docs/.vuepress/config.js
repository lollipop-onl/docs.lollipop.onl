module.exports = {
  plugins: [
    '@vuepress/last-updated',
    [
      '@vuepress/plugin-google-analytics',
      { ga: process.env.GA_TRACKING_ID }
    ],
  ],
};
