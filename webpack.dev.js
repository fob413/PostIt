const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/only-dev-server',
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
  ],
  devServer: {
    contentBase: 'build',
    hot: true,
    inline: true,
    port: process.env.PORT || 3000,
    host: 'localhost',
    historyApiFallback: true,
    publicPath: '/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
