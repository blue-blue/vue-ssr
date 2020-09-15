const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

/**
 * 定义全局环境变量
 */
const isDev = process.env.NODE_ENV === 'development'

let config = {}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

const devServer = {
  contentBase: path.resolve(__dirname, 'dist'), //将dist目录下的文件，作为可访问文件
  // open: true, // 自动打开浏览器
  compress: true, // 开启Gzip压缩
  port: 3000, // 端口
  host: '0.0.0.0', // 设置服务器的ip地址，默认localhost
  hot: true,
  overlay: true // 浏览器显示错误层
}

if (isDev) {
  // 开发环境
  config = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([new webpack.HotModuleReplacementPlugin()]),
    optimization: {
      usedExports: true // Tree Shaking, production模式下自带了Tree Shaking
    },
    devServer,
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[hash:8].chunk.js'
    }
  })
} else {
  // 生产环境
  config = merge(baseConfig, {
    mode: 'production',
    devtool: false,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css'
        // filename: '[name].[hash:8].css',
        // chunkFilename: '[name].[hash:8].chunk.css'
      })
    ]),
    output: {
      filename: 'static/js/[name].[contenthash:8].js'
      // filename: '[name].[contenthash].js',
      // chunkFilename: '[name].[contenthash].chunk.js'
    }
  })
}

module.exports = config
