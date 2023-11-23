const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const envPath =
    env.production === 'true' ? '.env.production' : '.env.development';
  return {
    mode: process.env.production === 'true' ? 'production' : 'development',
    devtool: process.env.production === 'true' ? 'hidden-source-map' : 'eval',
    entry: './src/index.tsx',
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: '[hash].js',
      clean: true,
    },
    devServer: {
      historyApiFallback: true,
      port: 3000,
      hot: true,
      static: path.resolve(__dirname, 'dist'),
      proxy: {
        '/api': {
          target: 'https://api.gomterview.com',
          changeOrigin: true,
        },
      },
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
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@atoms': path.resolve(__dirname, 'src/atoms/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@routes': path.resolve(__dirname, 'src/routes/'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        favicon: './public/favicon.ico',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [{ from: 'public/mockServiceWorker.js', to: '' }],
      }),
      new Dotenv({
        path: envPath,
      }),
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
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images',
          },
        },
      ],
    },
  };
};
