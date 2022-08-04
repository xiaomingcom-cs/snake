const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')

module.exports = {
  entry: "./src/index.ts",//入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction:false//摒弃webpack的箭头函数(ie11不支持)
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
        //后面的先执行，因此先调用ts-loader将ts转化为js,然后babel将js转化为浏览器兼容的js版本，然后将低版本不存在的语法(promise)通过core-js按需引入
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                {
                  targets: {
                    "chrome": "88",
                    "ie": "11",
                    
                  },
                  "corejs": "3",
                  "useBuiltIns":"usage"

                  }
                ]
              ]
            }
          }
          ,'ts-loader',],
        exclude:/node-modules/
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers:"last 2 versions"
                    }

                  ]
                ]
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),//每次构建时都清空dist文件夹
    new htmlWebpackPlugin({//以index.html为模板创建html，同时引入bundle.js
      template:"./src/index.html"
    }),
  ],
  resolve: {//加载模块(js,ts扩展名文件都可以作为模块)
    extensions: ['.ts','.js']
  },
  mode: "development"
}