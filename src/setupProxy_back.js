const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ustbhuangyi.com/music/api/',
      changeOrigin: true,
    })
  );
};
