module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath : '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test : /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}