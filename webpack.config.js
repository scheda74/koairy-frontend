const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  // externals: [ nodeExternals() ],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.ts' ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets:["@babel/preset-env", "@babel/preset-react"]}
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8000'
    },
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
