const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/Authentication",
    createProxyMiddleware({
      target: "https://dev.apinetbo.bekindnetwork.com",
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://dev.api.bekindnetwork.com",
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader("Origin", "https://dev.api.bekindnetwork.com");
      },
    })
  );
};
