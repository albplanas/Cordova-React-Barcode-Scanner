const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
    entry: './www/js/main.js',
    output: {
      path: path.resolve(__dirname, './www'),
      filename: 'index_bundle.js'
    },
  module: {  
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        },{
          loader: 'ify-loader'
        }]
      },
      {
        test: /(\.css|.scss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {}
            }
        ]
    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./www/src/index.html",
      filename: "./index.html"
    })
  ]
};








