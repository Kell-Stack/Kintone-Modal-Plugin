var path = require('path');
module.exports = {
  entry: {
    desktop: './src/js/desktop.js',
    config: './src/js/config.js',
    mobile: './src/js/mobile.js'
  },
  output: {
    path: __dirname + '/',
    filename: 'src/bundle/[name]_bundle.js'
  },
  resolve: {
    alias: {
      modules: path.join(__dirname, 'node_modules'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  devtool: 'eval-source-map'
};
