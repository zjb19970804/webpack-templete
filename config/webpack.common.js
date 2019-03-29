const path = require('path');
// html插件，自动注入打包后的bundle文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// js压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 每次打包前清空dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 从js中分离css，提取为单独css文件，与js并行加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 清除没有使用的js代码
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist')
    // 延迟加载的bundle
    // chunkFilename: '[name].bundle.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]cpmmon[\\/].*\.js$/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -10,
          enforce: true
        },
        // 分离缓存node_modules中的第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: -10,
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        // 开启缓存
        cache: true,
        // 开启多线程构建，默认os.cpu().length-1
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1
            }
          },
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 20
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 10
        }
      }
    ]
  },
  resolve: {
    symlinks: false
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: 'bundle-analyzer-report.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:6].css',
      chunkFilename: isDev ? '[id].css' : '[name].[contenthash:6].css'
    }),
    new HtmlWebpackPlugin({
      title: 'webpack4',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    })
  ]
};
