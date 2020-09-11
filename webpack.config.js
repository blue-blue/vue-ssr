const path = require('path')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * 定义全局环境变量
 */
const isDev = process.env.NODE_ENV === 'development'

/**
 *  css和sass开发、生产依赖
 *  生产分离css
 */
const cssConfig = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader'
]
const sassConfig = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'sass-loader',
  'postcss-loader'
]

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/i,
        use: 'vue-loader'
      },
      {
        test: /\.(jpg|jpeg|png|git|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024, // 将小于5KB的图片转为base64，减少http请求
              fallback: 'file-loader', // 大于limit限制的将转交给指定的loader处理，开启这里后就无需再单独配置file-loader options会直接传给fallback指定的loader
              name: '[name]_[hash].[ext]',
              outputPath: 'images/'
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
              name: '[name]_[hash:8].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: sassConfig
      },
      {
        test: /\.css$/i,
        use: cssConfig
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'test'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  }
}

if (isDev) {
  // 开发环境
  config.devServer = {
    contentBase: path.resolve(__dirname, 'dist'), //将dist目录下的文件，作为可访问文件
    // open: true, // 自动打开浏览器
    compress: true, // 开启Gzip压缩
    port: 3000, // 端口
    host: '0.0.0.0', // 设置服务器的ip地址，默认localhost
    hot: true,
    overlay: { errors: true } // 浏览器显示错误层
  }

  config.plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
  )
  Object.assign(config.optimization, {
    usedExports: true // Tree Shaking, production模式下自带了Tree Shaking
  })
} else {
  // 生产环境
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name][hash:8].css',
      chunkFilename: '[name][hash:8].chunk.css'
    })
  )
  Object.assign(config.optimization, {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  })
}

module.exports = config
