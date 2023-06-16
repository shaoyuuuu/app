const { defineConfig } = require("@vue/cli-service");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "D:/JavaProject/shanYouYuan/web/dist",
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api", //重写访问地址，在请求时可以省略target的地址，直接以/api开头
        },
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            autoprefixer(),
            pxtorem({
              propList: ["*"],
            }),
          ],
        },
      },
    },
  },
});
