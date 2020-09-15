const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * 定义全局环境变量
 */

const config = {
  entry: {
    app: path.resolve(__dirname, '../client/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      vue$: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true, // 轻微的错误eslint自动修复
              enforce: 'pre' // 强制eslint先执行
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(jpg|jpeg|png|git|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024, // 将小于5KB的图片转为base64，减少http请求
              fallback: 'file-loader', // 大于limit限制的将转交给指定的loader处理，开启这里后就无需再单独配置file-loader options会直接传给fallback指定的loader
              name: 'static/images/[name].[hash:8].[ext]'
              // outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[hash:8].[ext]'
              // outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      chunks: ['runtime', 'vendors']
    })
  ]
}

module.exports = config
