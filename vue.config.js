module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/_index.scss";'
      }
    }
  }
};
