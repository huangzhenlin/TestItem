// 该文件其实最终是要在node环境下执行的
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoadPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

// 导出一个具有特殊属性配置的对象
module.exports = {
    entry:['babel-polyfill','./src/main.js'],/* 入口文件模块路径 */
    output:{
        path:path.join(__dirname,'./dist/'),/* 出口文件模块所属目录，必须是一个绝对路径 */
        filename:'bundle.js'/* 打包的结果文件名称 */
    },
    devServer:{
        // 配置webpack-dev-server的www目录,配置虚拟内存
        contentBase:'./',
        hot:true
    },
    mode:'development',
    plugins:[
        // 该插件可以把index.html打包到bundle.js文件所属目录，跟着bundle走
        // 同时也会自动在index.html中注入script引用链接，并且引用的资源名称，也取决于打包的文件名称
        new htmlWebpackPlugin({
            template:'./index.html'
        }),
        new VueLoadPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals:{
        // 加载第三方资源
        'vue':'Vue',
        'vue-router':'VueRouter',
        'axios':'axios'
    },
    module:{
        rules:[
            {
                test:/.css$/,
                use:[
                    //注意：这里的顺序很重要，不要乱了顺序
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/.(jpg|png|gif|svg)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'], //转码规则
                        plugins:['transform-runtime']
                    }
                }
            },
            {
                test:/.vue$/,
                use:[
                    'vue-loader'
                ]
            }
        ]
    }
}