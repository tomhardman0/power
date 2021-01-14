const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const OUTPUT_DIR = 'dist/static';
const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: './src/app/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/static', to: '' }]
    })
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, OUTPUT_DIR)
  },
  devServer: {
    contentBase: path.join(__dirname, OUTPUT_DIR),
    compress: true,
    port: 3000
  }
};
