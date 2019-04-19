const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-env",
          ],
        },
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    modules: ['lib'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  }
}
