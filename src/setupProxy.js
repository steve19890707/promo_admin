const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/proxy", {
      target: "http://rd3-dev-gapi.guardians.one",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy": "",
      },
    })
  );
};
