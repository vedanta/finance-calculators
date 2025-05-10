const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx', './src/index.jsx'].find(entry => {
    try {
      require.resolve(entry);
      return true;
    } catch(e) {
      return false;
    }
  }) || './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/cra-run/' : '/'
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
  },
};
