'use strict';
const webpack = require('webpack')
const config= require('./config')

module.exports=  {
    context: config.common.context,
    entry: './index.js',
    resolve: {
        extensions: ['.js','.jsx','.scss','.json'],
        alias: {
            '@' : config.common.context
        }
    },
    module: {
        rules:[
            {
                enforce: 'pre',
                test: /\.(jsx|js)?$/,
                include: [
                    config.common.eslintIncludeDirectory
                ],
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                    emitWarning: true,
                }
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/, 
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEPL_ENV': JSON.stringify(process.env.DEPL_ENV)
        })
    ]
}
