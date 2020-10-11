const webpack= require('webpack')
const  {merge}= require('webpack-merge')
const chalk= require('chalk')
const WebpackCommonConfig= require('./webpack.config')
const config= require('./config')
const helpers= require('./helpers')
const FriendlyErrorsPlugin= require('friendly-errors-webpack-plugin')



const WebpackDevConfig= merge(WebpackCommonConfig,{
    output: {
        path: config.dev.buildRoot,
        filename: helpers.assetsPath('js/app.js')
    },
    devtool: config.dev.devtool,
    mode: config.dev.mode,
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 12240,
                    name: helpers.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            additionalData: '$env: ' + process.env.NODE_ENV + ';' 
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [chalk.blackBright.underline(`Your react application is running at: http://${config.dev.host}:${config.dev.port}`)]
            }
        })
    ],
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        publicPath: config.dev.assetsPublicPath,
        hot: true,
        compress: true,
        historyApiFallback: true,
        open: true,
        contentBase: config.dev.contentBase
    }
})

module.exports= Promise.resolve(WebpackDevConfig)





