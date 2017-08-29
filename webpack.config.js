// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// // const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
// //   template: path.join(__dirname, 'client/dist/index.html'),
// //   filename: 'index.html',
// //   inject: 'body'
// // });

// module.exports = {
//   entry: './client/index.js',
//   output: {
//     path: path.resolve('client/dist'),
//     filename: 'bundle.js'
//   },
//   node: {
//     net: 'empty',
//     tls: 'empty',
//     dns: 'empty',
//     fs: 'empty'
//   },
//   module: {
//     loaders: [
//       { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
//       { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ }
//     ]
//   }
//   // plugins: [HtmlWebpackPluginConfig]
// };
const webpack = require('webpack');
const path = require('path');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,  // to change to true soon
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './client/src/index'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/client/dist/js'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  // devServer: {
  //   contentBase: './client/src'
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, './client/src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
      {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};