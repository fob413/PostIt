const webpack = require('webpack');
const path = require('path');

module.exports = {
  // debug: true,
  devtool: 'inline-source-map',
  // noInfo: false,  // to change to true soon
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
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.NoErrorsPlugin()
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: [path.join(__dirname, './client/src')],
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
