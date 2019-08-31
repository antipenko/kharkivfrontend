var gulp = require('gulp');
var rename = require('gulp-rename');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var pngquant = require('imagemin-pngquant');
var webp = require('gulp-webp');
var babel = require("gulp-babel");
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

// variable for path to files
const path = {
    js: {
        wow: './node_modules/wowjs/dist/wow.min.js'
    }
}


function sync(cb) {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        port: 3000
    })

    cb();
}

gulp.task('sync', sync);

function compileStyle(cb) {

    gulp.src('./app/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .on('error', notify.onError(
            {
                message: "<%= error.message %> 😱",
                title: "Sass Error!"
            }
        ))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(notify({ message: 'Styles task complete 😉', sound: false, onLast: true }))
        .pipe(browserSync.stream());

    cb();
}
gulp.task('compileStyle', compileStyle);

// function buildHtml(cb) {
//     console.log('html');
//     gulp.src('app/**/*.html')
//         .pipe(gulp.dest('build/'))
//         .pipe(browserSync.reload({ stream: true }));
//     cb();
// }

function buildHtml(cb) {
    gulp.src('app/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({ stream: true }));
    cb();
}

gulp.task('buildHtml', buildHtml);

function buildJs(cb) {


    gulp.src("app/js/app.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.reload({ stream: true }));

        gulp.src(['app/js/*.js', '!app/js/app.js'])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

gulp.task('buildJs', buildJs);

function imageBuild(cb) {
    gulp.src('app/images/**/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/images'));

        gulp.src('app/images/**.*')
        .pipe(webp())
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.reload({ stream: true }));

    cb();
}

gulp.task('imageBuild', imageBuild);


function watchFiles(cb) {
    gulp.watch('./**/*.scss', compileStyle);
    gulp.watch('app/**/*.pug', buildHtml);
    gulp.watch('app/**/*.js', buildJs);

    cb();
}

function copyScripts(cb){
    
    gulp.src(path.js.wow)
        .pipe(gulp.dest('build/js'));

    cb();
}


function build(cb) {
    copyScripts(cb)
    buildHtml(cb);
    buildJs(cb);
    compileStyle(cb);
    imageBuild(cb);

    cb();
}

gulp.task('build', build);


gulp.task('default', gulp.parallel(build, sync, watchFiles))