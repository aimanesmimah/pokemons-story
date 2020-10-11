'use strict';

const path = require('path')
const deepmerge= require('deepmerge')

exports.common= {
    context: path.join(__dirname, '../src'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    templateFile: path.join(__dirname,'../','index.html'),
    templateBuild: path.join(__dirname,'../public','index.html'),
    eslintIncludeDirectory: path.join(__dirname,'../src')
}

exports.dev= deepmerge(exports.common,{
        host: 'localhost',
        port: 4040,
        useEslint: true,
        mode: 'development',
        devtool: '#source-map',
        baseDir: path.join(__dirname,'..'),
        buildRoot: path.join(__dirname,'./'),
        contentBase: path.join(__dirname,'..')
})

exports.build= deepmerge(exports.common,{
        mode: 'production',
        bundleAnalyzerReport: false,
        cleanAssetsDir: true,
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        distRoot: path.join(__dirname,'../public'),    
        envConfigPath: path.join(__dirname,'../.env')
})