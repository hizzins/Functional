const webpack = require('webpack');
const path = require('path');
const { rootPath, srcPath, buildPath } = require('./paths');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'babel-polyfill',
    srcPath + '/index.js'
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      components: srcPath + '/components',
      lib: srcPath + '/lib'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            options: {
              cacheDirectory: true,
              presets: [["@babel/env", {"modules": false}], "@babel/react"], // react hot loader 사용시 modules false 필수
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
                "transform-class-properties",
                "react-hot-loader/babel" // react-hot-loader은 수정시 state 유지 시켜준다.
              ]
            },
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // 'css-loader'
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8005,
    contentBase: rootPath,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), //브라우저에서 HMR 에러발생시 module name 표시
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};