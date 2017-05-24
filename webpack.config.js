var webpack = require('webpack');

module.exports = {
  entry: {
    client: './app/js/components/Main.jsx',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: [
            [
              "env",
              {
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }
            ],
            "react"
          ]
        }
      }
    ]
  }
}
