const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
// const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    // 全局映入
    // new webpack.ProvidePlugin({
    //   join: ['lodash', 'join']
    // }),
    // 第三方库不更改则hash不变，缓存优化
    new webpack.HashedModuleIdsPlugin()
    // servecie work功能
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ]
});
