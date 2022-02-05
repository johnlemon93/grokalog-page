import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: {
    index: './src/frontend/index.js',
    comment: './src/frontend/comment/index.js',
  },
  output: {
    filename: '[name].bd.js',
    path: path.resolve(__dirname, 'src/frontend'),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].bd.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false, // disable the behaviour
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader',
      }
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
