const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

const config = {
  entry: path.resolve(__dirname, './src', 'index'),
  mode,
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.(jpg|jpeg|png|svg)/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, './src/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new EslintPlugin({
      extensions: 'ts',
    }),
    new DotenvPlugin(),
  ],
};

module.exports = config;
