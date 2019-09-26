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
  entry: {{toArray templates}}.reduce((p, c) => {
    p[c] = `./${c}/index.js`
    return p
  }, {}),
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
      },{{#sass}} {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },{{/sass}} {
        test: /\.vue$/,
        loader: 'vue-loader'{{#sass}},
        options: {
          loaders: {
            // scss is not configured here; to use scss, copy sass to scss and
            // turn off indentedSyntax option.
            'sass': [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  indentedSyntax: true,
                  // data: '@import "variables";',
                  includePaths: [ path.resolve(__dirname, './styles') ]
                }
              }
            ]
          }
        }{{/sass}}
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
      key: fs.readFileSync('../conf/server.key'),
      cert: fs.readFileSync('../conf/server.crt')
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
    ...{{toArray templates}}.map(_ => new HtmlWebpackPlugin({
      filename: _ + '.html',
      template: _ + '/index.html',
      inject: true,
      compress: true,
      contentBase: '/dist/',
      chunks: [_]
    }))
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
      filename: `${package.name}-${package.version}-${Math.floor(
        new Date().getTime() / 1000
      ).toString(10)}.zip`
      // pathMapper: function(assetPath) {
      //   if(assetPath.startsWith('dist/'))
      //     return assetPath.replace('dist/', 'assets/')
      //   return assetPath
      // }
    })
  ])
}
