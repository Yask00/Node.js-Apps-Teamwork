const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');
// const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const destination = 'build';

const seleniumConfig = require('./app/config/selenium-config');

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


const { MongoClient } = require('mongodb');
const validator = require('./app/utils/validator');

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./app/db').setup(seleniumConfig.connectionString))
        .then((db) => require('./app/dbsetup')(db, validator))
        .then((db) => require('./app/data').setupData(db, validator)
        .then((data) => require('./app/app').init(data, seleniumConfig, db)))
        .then((app) => app.listen(seleniumConfig.PORT, () =>
        console.log(`CORS-enabled app running on http://localhost:${seleniumConfig.PORT}`)));
});

gulp.task('test-server:stop', () => {
    return MongoClient.connect(seleniumConfig.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

// SELENIUM TESTING
gulp.task('tests:browser', ['test-server:start'], () => {
   return gulp.src('./tests/browser/**/*.js')
       .pipe(mocha({
           reporter: 'list',
           timeout: 600000,
       }))
       .once('end', () => {
           gulp.start('test-server:stop');
       });
});
