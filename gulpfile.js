var gulp = require('gulp');
var clean = require('gulp-clean');
var eslint = require('gulp-eslint');
var gulpif= require('gulp-if');
//var removeCode= require('gulp-remove-code');
var { exec }= require('child_process');
var browserSync = require('browser-sync');
var fs= require('fs')
const packageJson= require('./package.json');



/**
 * @description running tasks labels and tasks configs
*/

var TASKS= Object.freeze({
    CLEAN_SITE: 'clean_site',
    COPY_PUBLIC: 'copy_public',
    RUN_BUILD_SERVER: 'run_build_server',
    SITE_WATCH: 'site_watch',
    SERVE_PROD: 'serve_prod',
    LOCAL_DEPLOY: 'local_deploy',
    DEPLOY_SCRIPT: 'deploy_script',
    BUILD_PROD: 'build_prod',
    MAKE_PRETTIER: 'make_prettier',
    ESLINT_FIX: 'eslint_fix', 
    //TEMPLATE_FIX: 'template_fix',
    DEPLOY_TASKS: function(){
        return [this.CLEAN_SITE,this.COPY_PUBLIC]
    }
})

var CONFIG= {
    env: 'development',
    serverPort: 3000,
    siteDir: './_site',
    srcDir: './src',
    publicDir: './public',
    publicTemplatePath: './public/index.html',
    templatePath: './index.html',
    eslintSrc: ['./src/**/*.jsx','./src/**/*.js'],
    siteSrc: '_site/*',
    publicSrc: 'public/**',
    eslintErrors: 0,
    eslintFix: false,
    setEnv: function(env){
        this.env= env
        process.env.NODE_ENV= env
    },
    incEslintErrors: function(count){
        this.eslintErrors += count
    },
    resetEslintErros: function(){
        this.eslintErrors= 0
    },
    hasEslintErrors: function(){
        return Boolean(this.eslintErrors)
    },
    isFixedFile: function(file){
        return Boolean(file.eslint) && file.eslint.fixed
    },
    siteDirExists: function(){
        return fs.existsSync(this.siteDir)
    }
}

/**
 * @description local prod simulation 
 */

gulp.task(TASKS.CLEAN_SITE, function (cb) {
  gulp.src(CONFIG.siteSrc)
    .pipe(clean())
    .on('finish', cb);
});

gulp.task(TASKS.COPY_PUBLIC, function (cb) {
  gulp.src([CONFIG.publicSrc])
    .pipe(gulp.dest(CONFIG.siteDir))
    .on('finish', cb);
});

gulp.task(TASKS.DEPLOY_SCRIPT,function(cb){
    exec(packageJson.scripts.deploy_dev,function(err,stdout){
        if(err) throw new Error(err)
        console.log(stdout)
    })
       .on('close',cb)
})

gulp.task(TASKS.RUN_BUILD_SERVER,function(){
    browserSync.init({ 
        server: CONFIG.siteDir, 
        port: CONFIG.serverPort, 
        logLevel: 'info',
        notify: false })
})

gulp.task(TASKS.SITE_WATCH, function (cb) {
    var tasks= TASKS.DEPLOY_TASKS()
    if(Boolean(browserSync.instances.length))
        tasks.push(browserSync.reload)
    gulp.watch(CONFIG.publicSrc,gulp.series(tasks))
});


gulp.task(TASKS.SERVE_PROD, 
    gulp.series(
        gulpif(!CONFIG.siteDirExists(),TASKS.COPY_PUBLIC,function(cb){ cb() }), 
        gulp.parallel([TASKS.RUN_BUILD_SERVER,TASKS.SITE_WATCH]) 
        ) 
)

gulp.task(TASKS.LOCAL_DEPLOY,gulp.series(TASKS.DEPLOY_TASKS().concat([TASKS.DEPLOY_SCRIPT])))

/**
 * @description CI tasks
 */

gulp.task(TASKS.BUILD_PROD,function(cb){
    CONFIG.setEnv('production')
    require('./build/build-prod')(cb)
})

/*gulp.task(TASKS.TEMPLATE_FIX,function(cb){
    gulp.src(CONFIG.templatePath)
      .pipe(removeCode({ production: true }))
      .pipe(gulp.dest(CONFIG.publicDir))
})*/

gulp.task(TASKS.MAKE_PRETTIER,function(cb){
    exec(packageJson.scripts.prettify)
        .on('close',cb)
})

gulp.task(TASKS.ESLINT_FIX,function(cb){
    var taskResult= gulp.src(CONFIG.eslintSrc)
     .pipe(eslint({fix: true}))
     .pipe(eslint.result(function(result){
        CONFIG.incEslintErrors(result.warningCount + result.errorCount)
     }))
     .pipe(gulpif(CONFIG.isFixedFile, gulp.dest(CONFIG.srcDir)))
     .pipe(gulpif(CONFIG.hasEslintErrors.bind(CONFIG),eslint.format()))
     .on('finish',cb)
})

gulp.task('CI',gulp.series([TASKS.ESLINT_FIX,TASKS.BUILD_PROD, TASKS.MAKE_PRETTIER, TASKS.ESLINT_FIX]));

exports.default = function (cb) {
  console.log('gulp default task');
  cb();
};
