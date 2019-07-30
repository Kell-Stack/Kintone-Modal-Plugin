var path = require('path');
var KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
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
      modules: path.join(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          }
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
  plugins: [
    new KintonePlugin({
      manifestJSONPath: './src/manifest.json',
      privateKeyPath: './private.ppk',
      pluginZipPath: './dist/plugin.zip'
    })
  ]
};
