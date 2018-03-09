'use strict';
const path = require('path');
const webpack = require('webpack');

const libraryName = 'MobxReactRouter';
const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const shouldMinify = Boolean(process.env.MINIFY);

let outputFile;

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  new webpack.optimize.OccurrenceOrderPlugin()
];

if (shouldMinify) {
  plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
      minimize: true,
      compress: {
        warnings: false
      },
      mangle: true
    }
  ));
  outputFile = 'mst-react-router.min.js';
} else {
  outputFile = 'mst-react-router.js';
}

module.exports = {
  devtool: isDev ? 'source-map' : false,
  entry: [path.resolve(__dirname, 'index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    {
      'mobx-state-tree': {
        root: 'MobxStateTree',
        commonjs2: 'mobx-state-tree',
        commonjs: 'mobx-state-tree',
        amd: 'mobx-state-tree'
      }
    }
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: plugins
};
