// utils
const gulp = require('gulp');
const bsync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// css
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nano = require('gulp-cssnano');

// js
const webpack = require('webpack-stream');

/**
 * Styles
 */
gulp.task('styles', () => gulp.src('./styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(nano({zindex: false, reduceIdents: false}))
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./styles'))
    .pipe(bsync.stream())
);

/**
 * Js
 */
gulp.task('js', () => gulp.src('./js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./js'))
);

/**
 * Watch
 */
gulp.task('watch', () => {
    gulp.watch('./**/*.html', ['reload']);
    gulp.watch('./styles/**/*.scss', ['styles']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['js', 'reload']);
});

/**
 * Bsync
 */
gulp.task('bsync', () => bsync.init({server: {baseDir: './'}}));
gulp.task('reload', () => bsync.reload());

/**
 * Tasks
 */
gulp.task('build', ['styles', 'js']);
gulp.task('build-watch', ['build', 'watch']);
gulp.task('dev', ['build-watch', 'bsync']);
gulp.task('default', ['dev']);