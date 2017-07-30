const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');
// const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const destination = 'build';

gulp.task('copy:templates', () => {
    return gulp.src('src/**/*.pug')
        .pipe(gulp.dest(destination));
});

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest(destination));
});

// START SERVER.js
gulp.task('start', () => {
    nodemon({
        script: './server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
    });
});

// PRETESTS FOR ISTANBUL COVERAGE
gulp.task('pre-test', () => {
    return gulp.src([
            './app/data/**/*.js',
            './app/controllers/*.js',
            './app/models/*.js',
            './app/routers/*.js',
            './app./config/*.js',
            './app./db/*.js',
            './server.js',
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

// UNIT TESTING
gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
            './tests/unit/**/*.js',
            './tests/integration/**/*.js',
        ])
        .pipe(mocha({
            reporter: 'spec',
        }))
        .pipe(istanbul.writeReports());
});

// SELENIUM TESTING
//gulp.task('tests:browser', ['test-server:start'], () => {
//    return gulp.src('./tests/browser/**/*.js')
//        .pipe(mocha({
//            reporter: 'list',
//            timeout: 20000,
//        }))
//        .once('end', () => {
//            gulp.start('test-server:stop');
//        });
//});