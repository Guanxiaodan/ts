# 初始化

    npm i typescript -g
    tsc --init

## 写一个 index.ts 文件，运行

    tsc index.ts

会生成一个 index.js 文件，里面是编译后的 js 代码

## 也可以使用官网查看编译后的内容 [在线编译](https://www.typescriptlang.org/zh/play?#code/FAGwpgLgBAFmIgPYC4oGcICcCWA7A5lALxQBEgNN6AAcoFRyEapA3EA)

## 配置 webpack

    // 安装让ts跑起来的工具webpack
    npm i webpack webpack-cli webpack-dev-server -D

### 为了工程的可维护性，需要分别书写开发环境配置，生产环境配置，和公共配置，最后通过插件合并

- webpack.config.js 是所有文件的入口
- webpack.base.config.js 是公共配置
- webpack.dev.config.js 是开发环境配置
- webpack.pro.config.js 是生产环境配置

#### 公共配置：webpack.base.config.js

- 因为引入了新的文件类型（ts,tsx），所以需要使用安装 ts-loader,并且也需要在项目中安装一下 typescript

  npm i ts-loader typescript -D

- 还是用到一个插件：HtmlWebpackPlugin
- 作用是通过一个模板，帮助生成网站首页，而且可以帮助把生成的文件自动嵌入到首页中

#### 开发环境配置：webpack.dev.config.js

- 开启 source map，使用官方推荐的 cheap-module-eval-source-map
- cheap 表示 source map 会忽略文件的列信息，因为在调试的时候，列信息是没有用的
- module 表示会定为到 ts 源码，而不是经过转译后的 js 代码
- eval-source-map 表示会将 source map 以 data url 的形式打包到文件中，它的重编译速度很快，所以不必担心性能问题

#### 生产环境配置：webpack.pro.config.js

- 安装插件：CleanWebpackPlugin
- 作用是在每次成功构建之后清空 this 目录，因为为了避免缓存，我们经常会在文件后加上哈希，这样多次构建后，文件就会越来越多，通过这个插件就可以清空无用的文件

#### 配置文件入口：webpack.config.js

- 使用一个插件：webpack-merge
- 作用是把两个配置文件合并
- 根据当前环境判断使用生产环境配置文件还是开发环境配置文件，并将其和公共配置文件合并

## 配置 npm 脚本 package.json

- 入口文件为 ./src/index.ts
- 启动命令 "start": "webpack serve --mode development --env development --config ./build/webpack.config.js"
- 生成生产环境脚本：
