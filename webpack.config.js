const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, options) => {
  const isProd = options.mode === 'production'
  let plugins = [
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
  ]

  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      // alias: {
      //   process: 'process/browser',
      // },
    },
    entry: {
      myLib: path.resolve(__dirname, './src/index.ts'),
    },
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/umd/'),
      library: 'myLib', // 在全局变量中增加一个library变量
      libraryTarget: 'umd',
      // libraryExport: 'default',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(ts|js)x?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader?cacheDirectory=true',
              },
            },
          ],
        },
      ],
    },
    plugins: plugins,
  }
}
