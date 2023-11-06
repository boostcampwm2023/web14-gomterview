const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.production === 'true' ? 'production' : 'development',
  devtool: process.env.production === 'true' ? 'hidden-source-map' : 'eval',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    static: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      // src 폴더를 '@' 별칭으로 설정
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@common': path.resolve(__dirname, 'src/components/common/'),
      '@foundation': path.resolve(__dirname, 'src/components/foundation/'),
      '@page': path.resolve(__dirname, 'src/page/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                { runtime: 'automatic', importSource: '@emotion/react' },
              ],
              '@babel/preset-typescript', // TypeScript를 위한 Babel 프리셋 추가
            ],
            plugins: ['@emotion/babel-plugin'],
          },
        },
      },
    ],
  },
};
