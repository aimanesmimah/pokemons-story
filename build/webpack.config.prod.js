const webpack= require('webpack')
const {merge}= require('webpack-merge')
const UglifyJsPlugin= require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const OptimizeCSSPlugin= require('optimize-css-assets-webpack-plugin')
const  MiniCSSExtactPlugin = require('mini-css-extract-plugin')
const WebpackCommonConfig= require('./webpack.config')
const config= require('./config')
const helpers= require('./helpers')

const WebpackProdConfig= merge(WebpackCommonConfig,{
    output: {
        path: config.build.distRoot,
        filename: helpers.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: helpers.assetsPath('js/[id].[chunkhash].js'),
        publicPath: config.build.assetsPublicPath
    },
    devtool: false,
    mode: config.build.mode,
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: helpers.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "html-loader" }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCSSExtactPlugin.loader,
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
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              mangle: true,
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true,
            extractComments: true
        }),
        new MiniCSSExtactPlugin({
            filename: helpers.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: helpers.assetsPath('css/[id].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true }
        }),
        new HtmlWebpackPlugin({
            title: "build template",
            filename: 'index.html',
            template: '../index.html',
            inject: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10000
        })
    ]
})


if(config.build.cleanAssetsDir){
    const {CleanWebpackPlugin}= require('clean-webpack-plugin')
    WebpackProdConfig.plugins.unshift(new CleanWebpackPlugin({
        cleanStaleWebpackAssets: true
    }))
}

if(config.build.bundleAnalyzerReport){
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
    WebpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports= Promise.resolve(WebpackProdConfig)