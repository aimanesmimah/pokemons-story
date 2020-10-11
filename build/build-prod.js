const webpack= require('webpack')
const chalk= require('chalk')
const WebpackConfig= require('./webpack.config.prod')


module.exports= function(onFinish){
    const spinner = require('./helpers').buildSpinner("building for production... 👇\n\n")
    spinner.start()
    WebpackConfig.then(config=>{
        require('./helpers').checkVersions()
        webpack(config,(err,stats)=>{
            if(err) throw err

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false
            }) + '\n\n')
        
            if(stats.hasErrors()){
                console.log(stats.toJson().errors)
                console.log(chalk.red('Build failed with errors.'))
                process.exit(1)
            }

            if(stats.hasWarnings()){
                console.log(chalk.yellow('Build finished with warnings.\n'))
            }

            console.log('\n\n')
            spinner.info("production bundles are ready 👌\n")
            spinner.stop()

            console.log(chalk.grey(`Tip: You need an http server to serve your built files, 
                    This won't work running the html using only a browser`))
            
            //process.exit(0)
            onFinish()
        })
    })
}



