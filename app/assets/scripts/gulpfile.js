'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({ entries: './MasterControllerPanel.jsx', extensions: ['.jsx'], debug: true }).transform(babelify).bundle().pipe(source('demoPagebundle.js')).pipe(gulp.dest('../../public/javaScripts'));
});

gulp.task('buildProfile', function () {
    return browserify({ entries: './ProfileProjects.jsx', extensions: ['.jsx'], debug: true }).transform(babelify).bundle().pipe(source('profilePagebundle.js')).pipe(gulp.dest('../../public/javaScripts'));
});

gulp.task('watchProfile', ['buildProfile'], function () {
    gulp.watch('*.jsx', ['buildProfile']);
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch', 'watchProfile']);
