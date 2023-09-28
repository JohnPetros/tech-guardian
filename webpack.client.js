const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    session: './src/session.mjs',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle_client.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebpackPlugin({
      template: '!!raw-loader!./src/views/pages/login.ejs',
      filename: 'login.ejs',
      chunks: ['session'],
    }),
  ],
}
