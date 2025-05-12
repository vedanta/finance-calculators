const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Get repository name from environment or infer from URL
const getPublicPath = () => {
  if (process.env.NODE_ENV === 'production') {
    // Try to get repository name from GitHub environment
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
    if (repoName) {
      return `/${repoName}/`;
    }
    // Fallback: use current directory name
    return `/${path.basename(process.cwd()).replace('templates', '').replace('-tsx', '')}/`;
  }
  return '/';
};

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: getPublicPath()
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: { host: '0.0.0.0', port: 3000, hot: true }
};
