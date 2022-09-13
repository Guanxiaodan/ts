const webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        devtools: "eval-cheap-module-source-map",
      },
    }),
  ],
};
