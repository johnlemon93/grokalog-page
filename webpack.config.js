import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/frontend/index.js',
  output: {
    filename: 'index.bd.js',
    path: path.resolve(__dirname, 'src/frontend'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
};
