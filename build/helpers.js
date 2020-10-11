const config= require('./config')
const path= require('path')
const chalk= require('chalk')

exports.assetsPath = (_path) => {
    return path.join(config.common.assetsSubDirectory,_path)
}

exports.checkVersions= () => {
    const semver= require('semver')
    const nodeV= semver.clean(process.version)
    const packageJsonConfig= require('../package.json')

    if(!(packageJsonConfig.engines && semver.satisfies(nodeV,packageJsonConfig.engines.node))){
        console.log(chalk.red('node environment version is not satified'))
        process.exit(1)
    }

    const { exec }= require('child_process')
    exec('npm -v',(err,stdout)=>{
        if(err || !stdout){
            console.log(chalk.red('npm command not found'))
            process.exit(1)
        }

        if(!(packageJsonConfig.engines && semver.satisfies(stdout,packageJsonConfig.engines.npm))){
            console.log(chalk.red('npm version is not satisfied'))
            process.exit(1)
        }
    })
}

exports.buildSpinner= (_title) => {
    const ora= require('ora')
    const spinner= ora(_title)
    spinner.color= "yellow"
    return spinner
}