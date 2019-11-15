//导入路径处理模块，nodejs自带的核心模块，不需要额外安装
let path = require('path');

// 导入分离css插件
let miniCssExtractPlugin = require('mini-css-extract-plugin');

//导入处理html模板插件
let htmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // 配置文件
    //develpment: 开发模式
    //production: 生产模式
    mode: 'development',


    // 配置入口
    entry: {
        app: './app/app.js',
    },

    // 配置输出文件路径
    output: {
        //打包输出的文件路径
        path: path.resolve(__dirname + '/build'),
        //打包输出文件重命名
        filename: '[name].min.js'
    },

    //配置loader
    module: {
        //定义loader规则
        rules: [
            //每一个对象就是一个loader规则
            //处理css
            {
                //匹配文件规则
                test: /\.css$/,
                use: [
                    // {
                    //     loader: "style-loader"
                    // },
                    //分离css
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {loader:"style-loader"},
                    //分离css
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/ ,
                  //输出文件名
                //   filename: '[name].min.css',
                  use: [
                      {
                          loader: 'url-loader',
                          options:{
                              //如果图片小于2000B，图片被转为base64
                              limit:1000
                          }
        
                      }
        
                  ]
            },

            // 处理html模板图片
            {
                test:/\.html?$/,
                use:[
                    {loader:'html-withimg-loader'}
                ]
            }
        ]
    },

    

    //配置插件
    plugins: [
        new miniCssExtractPlugin({
            //输出文件名
          filename:'[name].min.css'
        }),

        //实例化处理html模板插件
        new htmlWebpackPlugin({
            //处理模板路径
            template:'./app.html' ,

            /* 
            true:将生成的js插入到body结束标签之前，默认为true
            false: 没有插入生成的js
            head: 将生成的jsc插入在head结束标签之前
            body: 等同于 true  
            */

            inject: 'body',

            // 最小化
            minify:{
                //是否移除注释
                removeComments : true ,

                // 是否移除标签属性的引导（双引号 或 单引号）
                remoeveAttributeQuotes: true ,

                // 是否移除html文件的空白符
                collapseWhitespace: true 
            },

            filename: 'app.min.html'
        })
    ]
}