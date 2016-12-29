var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  node : {
    fs: "empty",
    cluster: "empty",
    "hipchat-notifier": "empty",
    dgram: "empty",
    loggly: "empty",
    "mailgun-js": "empty",
    "slack-node": "empty",
    nodemailer: "empty",
    net: "empty",
    child_process: "empty"
  }
}
