const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: {
    application: ['./app/components/application.js', 'webpack/hot/only-dev-server']
  },
  externals: null,
  module: {
    loaders: [
      {test: [/\.svg$/, /\.png$/, /\.eot$/, /\.ttf$/, /\.woff$/], loader: 'file?name=[name]-[hash].[ext]'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot'},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: __dirname,
    pathinfo: true
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    new ExtractTextPlugin("components.css", {
      allChunks: true
    })
  ],
  resolve: {
    alias: {
      'native-or-bluebird': `${__dirname}/../../app/lib/native_or_bluebird.js`
    }
  },
  watch: true
};
