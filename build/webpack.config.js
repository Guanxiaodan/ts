const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const devConfig = require("./webpack.dev.config");
const proConfig = require("./webpack.pro.config");

module.exports = (env, argv) => {
  console.log('gxd','argv.mode:',argv.mode);
  let config = argv.mode === "development" ? devConfig : proConfig; // 判断当前环境看使用开发环境配置还是生产环境配置
  return merge(baseConfig, config); // 将环境配置文件和公共配置文件合并
};
