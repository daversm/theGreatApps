'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('apply-prod-environment', function() {
    process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = 'production';
    if (process.env.NODE_ENV != 'production') {
        throw new Error("Failed to set NODE_ENV to production!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to production" + "\n");
    }
});

gulp.task('build', function () {
    return browserify({ entries: './MasterControllerPanel.jsx', extensions: ['.jsx'], debug: true }).transform(babelify).bundle().pipe(source('demoPagebundle.js')).pipe(gulp.dest('../../public/javaScripts'));
});

gulp.task('buildProfile', function () {
    return browserify({ entries: './ProfileProjects.jsx', extensions: ['.jsx'], debug: true }).transform(babelify).bundle().pipe(source('profilePagebundle.js')).pipe(gulp.dest('../../public/javaScripts'));
});

gulp.task('buildDaw', function () {
    return browserify({ entries: './MasterControllerPanelDAW.jsx', extensions: ['.jsx'], debug: true }).transform(babelify).bundle().pipe(source('mainDaw.js')).pipe(gulp.dest('../../public/javaScripts'));
});

gulp.task('watchProfile', ['buildProfile'], function () {
    gulp.watch('*.jsx', ['buildProfile']);
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('watchDaw', ['buildDaw'], function () {
    gulp.watch('*.jsx', ['buildDaw']);
});

gulp.task('default', ['apply-prod-environment','watch', 'watchProfile', 'watchDaw']);
