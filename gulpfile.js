const gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    nodemon = require('gulp-nodemon'),
    destination = 'build';

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

gulp.task('start', () => {
    nodemon({
        script: './server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
    });
});