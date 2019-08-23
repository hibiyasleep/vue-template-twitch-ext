const fs = require('fs')
const path = require('path')
const package = require('./package.json')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ZipWebpackPlugin = require('zip-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    overlay: './overlay/index.js',
    config: './config/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: './',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'sass': [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  indentedSyntax: true,
                  data: '@import "variables";',
                  includePaths: [ path.resolve(__dirname, './styles') ]
                }
              }
            ]
          }
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(woff|woff2|ttf|eot|otf)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }, {
        test: /\.(png|svg)$/,
        loader: "url-loader?name=assets/img/[name].[ext]" // ,
        // options: {
        //   name: '[name].[ext]?[hash]'
        // }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('.')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    hot: true,
    // noInfo: true,
    inline: true,
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true,
    index: 'index.html',
    https: {
      key: fs.readFileSync('../shion-selfsigned.key'),
      cert: fs.readFileSync('../shion-selfsigned.crt')
    }
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'video_component.html',
      template: 'overlay/index.html',
      inject: true,
      compress: true,
      contentBase: '/dist/',
      chunks: ['overlay']
    }),
    new HtmlWebpackPlugin({
      filename: 'config.html',
      template: 'config/index.html',
      inject: true,
      compress: true,
      contentBase: '/dist/',
      chunks: ['config']
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = undefined
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.optimization = {
    minimize: false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            dead_code: true,
            unused: true,
            drop_console: true,
            warnings: false,
            dead_code: true
          },
          mangle: false,
          output: {
            beautify: false,
            comments: false
          }
        },
        sourceMap: true
      })
    ],
    nodeEnv: 'production'
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin([{
      from: 'assets/img/**',
      to: '',
      toType: 'dir'
    }]),
    new ZipWebpackPlugin({
      filename: package.name + '-' + package.version + '.zip',
      // pathMapper: function(assetPath) {
      //   if(assetPath.startsWith('dist/'))
      //     return assetPath.replace('dist/', 'assets/')
      //   return assetPath
      // }
    })
  ])
}
